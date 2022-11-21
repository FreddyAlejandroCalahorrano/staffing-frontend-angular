import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "@interfaces/person";
import {ValidateDatePerson, ValidatorsPEmail} from "../../../validators/validators";
import {
  ChapterService,
  CountryService,
  MessageBarService,
  PersonService,
  ProfilesService,
  ProvidersService,
  RolesService,
  SeniorityService,
} from '@services/index';
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {DialogService} from "@modal/dialog.service";
import {Router} from "@angular/router";
import {getMessageError, getToday} from '../../../common/utils/fn';
import {filter, map} from "rxjs/operators";
import {Chapter} from "@interfaces/chapter";
import {Profile} from "@interfaces/profile";

const MONTHS = [
  {value: 1, maxDay: 31, label: 'Enero'},
  {value: 2, maxDay: 29, label: 'Febrero'},
  {value: 3, maxDay: 31, label: 'Marzo'},
  {value: 4, maxDay: 30, label: 'Abril'},
  {value: 5, maxDay: 31, label: 'Mayo'},
  {value: 6, maxDay: 30, label: 'Junio'},
  {value: 7, maxDay: 31, label: 'Julio'},
  {value: 8, maxDay: 31, label: 'Agosto'},
  {value: 9, maxDay: 30, label: 'Septiembre'},
  {value: 10, maxDay: 31, label: 'Octubre'},
  {value: 11, maxDay: 30, label: 'Noviembre'},
  {value: 12, maxDay: 31, label: 'Diciembre'}
]

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  showSpinner: boolean = false

  @Input() isEdit: boolean
  @Input() personEdit: Person

  personFormGroup: FormGroup

  private numPattern: any = /^[0-9]*$/;
  private alphanumeric: any = /^[0-9A-Za-z]*$/

  listCountry$: Promise<any[]>
  listRole$: Promise<string[]>
  listProviders$: Promise<any[]>
  listSeniority$: Promise<any[]>
  listChapter$: Promise<Chapter[]>
  listProfile$: Promise<Profile[]>

  listBornDay: any[] = []

  listBornMonth: { value: number, maxDay: number, label: string }[] = [...MONTHS]

  constructor(
    private personService: PersonService,
    private countryService: CountryService,
    private roleService: RolesService,
    private providerService: ProvidersService,
    private modalBsService: DialogService,
    private router: Router,
    private formBuilder: FormBuilder,
    private seniorityService: SeniorityService,
    private profilesService: ProfilesService,
    private chapterService: ChapterService,
    private messageBarService: MessageBarService) {

    this.listCountry$ = this.countryService.getCountry()
    this.listProviders$ = this.providerService.getProviders()
    this.listSeniority$ = this.seniorityService.getSeniority()
    this.listRole$ = this.roleService.getRole()
    this.listProfile$ = this.profilesService.getProfiles()
    this.listChapter$ = this.chapterService.getChapters()
  }

  ngOnInit(): void {
    this.buildForm();
    this.editData();
  }

  editData() {
    if (!this.isEdit) return;
    this.personFormGroup?.patchValue({
      name: this.personEdit.name,
      lastName: this.personEdit.lastName,
      email: this.personEdit.email,
      role: this.personEdit.role || '',
      phoneNumber: this.personEdit.phoneNumber,
      bankEntryDate: this.personEdit.bankEntryDate,
      state: this.personEdit.state,
      ultimatix: this.personEdit.ultimatix,
      codeCountry: this.personEdit.codeCountry,
      idProvider: this.personEdit.idProvider,
      idSeniority: this.personEdit.idSeniority,
      idProfile: this.personEdit.idProfile,
      idChapter: this.personEdit.idChapter,
      bornDay: this.personEdit.bornDay,
      bornMonth: this.personEdit.bornMonth
    })
    this.personFormGroup.markAllAsTouched()
  }

  buildForm() {
    this.personFormGroup = this.formBuilder.group({
      name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }],
      lastName: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }],
      email: ['', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ],
        asyncValidators: [ValidatorsPEmail(this.personService, this.personEdit?.email)],
        updateOn: 'blur'
      }],
      role: ['', {
        validators: [Validators.required],
      }],
      phoneNumber: ['', {
        validators: [
          Validators.pattern(this.numPattern),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      }],
      bankEntryDate: [getToday(), [ValidateDatePerson()]],
      user: [{value: 'luischi', disabled: true}],
      state: [{value: 'ACTIVO', disabled: true}],
      ultimatix: ['', {
        validators: [
          Validators.maxLength(8),
          Validators.pattern(this.numPattern),
        ]
      }],
      codeCountry: [null, [Validators.required]],
      idProvider: [null, [Validators.required]],
      idSeniority: [null, [Validators.required]],
      idProfile: [null, [Validators.required]],
      idChapter: [null, [Validators.required]],
      bornMonth: [0, []],
      bornDay: [0, []],
    })
    this.registerEvents()
  }

  registerEvents() {
    this.bornMonth
      .valueChanges
      .pipe(
        filter(value => value > 0),
        map(value =>
          this.listBornMonth.find(mes => mes.value == value)
        )
      ).subscribe(mes => {
      this.bornDay.setValue(null)
      this.listBornDay = Array.from({length: mes.maxDay},
        (x, i) => ({value: i + 1})
      )
    })
  }

  async onSubmit() {
    this.personFormGroup.markAllAsTouched()
    if(this.personFormGroup.invalid) return
    const dataForm = this.personFormGroup.getRawValue()

    const {
      name,
      lastName,
      phoneNumber,
      ultimatix,
      bankEntryDate,
      bornDay,
      bornMonth
    } = dataForm
    const submittedPerson = {
      ...dataForm,
      ...({name: name.toUpperCase()}),
      ...({lastName: lastName.toUpperCase()}),
      ...(phoneNumber == "" ? null : {phoneNumber}),
      ...(ultimatix == "" || ultimatix == null ? null : {ultimatix: +ultimatix}),
      ...(bankEntryDate == "" ? null : {bankEntryDate}),
      ...(bornDay == "" ? 0 : {bornDay}),
      ...(bornMonth == "" ? 0 : {bornMonth}),
    }

    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {
        title: this.isEdit ? '¿Está seguro que desea actualizar la información?'
          : '¿Está seguro que desea crear el registro?'
      },
    ).subscribe((result: boolean) => {
      if (!result) return

      const promiseAddEdit = this.isEdit ? this.personService.updatePerson(submittedPerson, this.personEdit.id) :
        this.personService.addPerson(submittedPerson);

      promiseAddEdit
        .then((data) => {
          this.redirectTo(this.isEdit, data.id)
        })
        .catch((err) =>
          this.messageBarService.showMessage(
            getMessageError(err.response.data),
            "error"
          )
        )

    })
  }

  redirectTo(edit?: boolean, id?: number) {
    this.messageBarService.showMessage(
      edit ? "Persona actualizada con éxito" : "Persona creada con éxito",
      "success"
    )
    let rout = edit ? ['personas']  : ['personas','editar', id]
    this.router.navigate(rout)
  }

  //#region Getters - Setters
  get name() {
    return this.personFormGroup.get('name') as FormControl;
  }

  get lastName() {
    return this.personFormGroup.get('lastName') as FormControl;
  }

  get email() {
    return this.personFormGroup.get('email') as FormControl;
  }

  get bornDay() {
    return this.personFormGroup.get('bornDay') as FormControl;
  }

  get bornMonth() {
    return this.personFormGroup.get('bornMonth') as FormControl;
  }

  get role() {
    return this.personFormGroup.get('role') as FormControl;
  }

  get phoneNumber() {
    return this.personFormGroup.get('phoneNumber') as FormControl;
  }

  get codeCountry() {
    return this.personFormGroup.get('codeCountry') as FormControl;
  }

  get providerTo() {
    return this.personFormGroup.get('idProvider') as FormControl;
  }

  get seniorityTo() {
    return this.personFormGroup.get('idSeniority') as FormControl;
  }

  get ultimatix() {
    return this.personFormGroup.get('ultimatix') as FormControl;
  }

  get bankEntryDate() {
    return this.personFormGroup.get('bankEntryDate') as FormControl;
  }

  //#endregion

}
