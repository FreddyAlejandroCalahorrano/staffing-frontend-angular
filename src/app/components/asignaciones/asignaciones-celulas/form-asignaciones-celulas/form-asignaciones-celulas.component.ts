import {PersonCelula} from 'src/app/types/personCelula';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Celula} from 'src/app/types/celula';
import {DialogService} from '@modal/dialog.service';
import {FormAsignacionesModalComponent} from '../../form-asignaciones-modal/form-asignaciones-modal.component';
import {from} from 'rxjs';
import {AsignacionesCelulasService} from '@services/asignaciones-celulas.service';
import {MessageBar} from "@interfaces/messageBar";
import {Person} from "@interfaces/person";
import {catchError, switchMap, tap} from "rxjs/operators";
import {PersonCelulaPercentage} from "@interfaces/personCelulaPercentage";
import {getMessageError, getToday} from "../../../../common/utils/fn";
import {Tribu} from "@interfaces/tribu";
import {CelulaService, MessageBarService, TribuService,} from "@services/index";
import {DateValidators} from "../../../../validators/date-validators";

@Component({
  selector: 'app-form-asignaciones-celulas',
  templateUrl: './form-asignaciones-celulas.component.html',
  styleUrls: ['./form-asignaciones-celulas.component.scss']
})
export class FormAsignacionesCelulasComponent implements OnInit {
  personCelulaFormGroup: FormGroup
  listTribu$: Promise<Tribu[]>
  listCelulas: Celula[]
  isEdit: boolean = false
  selectedPerson: Person
  selectedPersonCelula: PersonCelula

  personCelulaPercentageList$: Promise<PersonCelulaPercentage[]>
  totalPercentage: number = 0

  constructor(
    private aRoute: ActivatedRoute,
    private modalBsService: DialogService,
    public _asignacionesService: AsignacionesCelulasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tribuService: TribuService,
    private celulaService: CelulaService,
    private messageBarService: MessageBarService,) {
    this.listTribu$ = this.tribuService.getTribu()
  }

  ngOnInit(): void {
    this.buildForm()
    const {data} = this.aRoute.snapshot

    this.editData(data.personCelula)
  }

  editData(personCelula: any) {
    if (!personCelula) return

    this.selectedPersonCelula = personCelula
    this.selectedPerson = personCelula.personTo

    this.personCelulaFormGroup.patchValue({
      tribuName: personCelula.celulaTo.idTribu,
      celulaName: personCelula.celulaTo.id,
      personCelula: `${personCelula.personTo.name} ${personCelula.personTo.lastName}`.toUpperCase(),
      assignmentStartDate: personCelula.assignmentStartDate,
      tentativeAssignmentEndDate: personCelula.tentativeAssignmentEndDate,
      allocationPercentage: personCelula.allocationPercentage,
      observation: personCelula.observation
    }, {emitEvent: false})

    /* Setear un registro de Celula */
    this.listCelulas = [
      personCelula.celulaTo
    ]
    this.isEdit = true
  }

  buildForm() {
    this.personCelulaFormGroup = this.formBuilder.group({
      tribuName: ['', [Validators.required]],
      celulaName: ['', [Validators.required]],
      personCelula: ['', [Validators.required]],
      assignmentStartDate: [getToday(),
        [
          Validators.required,
          DateValidators.dateValid
        ]
      ],
      tentativeAssignmentEndDate: ['',
        [
          Validators.required,
          DateValidators.dateValid
        ]
      ],
      allocationPercentage: ['',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      // typeRoleLeader: ['', [Validators.required]],
      observation: ['']
    }, {
      validators: [
        DateValidators.fromToDate('assignmentStartDate', 'tentativeAssignmentEndDate')
      ]
    })
    this.registerEvents()
  }

  registerEvents() {
    this.tribuName.valueChanges
      .pipe(
        switchMap((idTribu) => this.celulaService.getCelulaByTribu(idTribu))
      ).subscribe(ls => {
      this.celulaName.setValue(null)
      this.listCelulas = [...ls]
    })
  }

  onSubmit() {
    this.personCelulaFormGroup.markAllAsTouched()
    if (this.personCelulaFormGroup.invalid) return

    let submitAsignacionPersonCelula: PersonCelula = this.getDataRequest(this.isEdit)

    const promiseEditAdd = (this.isEdit) ?
      this._asignacionesService.updatePersonCelula(submitAsignacionPersonCelula)
      : this._asignacionesService.addPersonCelula(submitAsignacionPersonCelula)

    promiseEditAdd
      .then(() => this.redirectTo(this.isEdit))
      .catch((err) =>
        this.setupMessageBar({
          status: "error",
          text: getMessageError(err.response.data)
        })
      )
  }

  getDataRequest(edit?: boolean) {
    const {
      assignmentStartDate,
      tentativeAssignmentEndDate,
      allocationPercentage,
      celulaName,
      observation
    } = this.personCelulaFormGroup.getRawValue()
    let submitAsignacionPersonCelula: PersonCelula = {
      assignmentStartDate: assignmentStartDate == "" ? null : assignmentStartDate,
      tentativeAssignmentEndDate: tentativeAssignmentEndDate == "" ? null : tentativeAssignmentEndDate,
      allocationPercentage: allocationPercentage == "" ? null : +allocationPercentage,
      personTo: this.selectedPerson,
      celulaTo: this.getCelulaById(celulaName),
      observation,
      user: "luischi",
      state: "ACTIVO"
    }

    if (edit) {
      submitAsignacionPersonCelula = {
        ...submitAsignacionPersonCelula,
        id: this.selectedPersonCelula.id,
        state: this.selectedPerson.state
      }
    }

    return submitAsignacionPersonCelula
  }

  redirectTo(edit?: boolean) {
    this.setupMessageBar({
      status: "success",
      text: edit ? "Asignación editada con éxito" : "Recurso asignado con éxito"
    })
    this.router.navigate(['/asignaciones/celulas'])
  }

  getCelulaById(id: number): Celula {
    return this.listCelulas.find(celula => celula.id == id)
  }

  onSearchStaffPersonClick() {
    this.modalBsService.addDialog(
      FormAsignacionesModalComponent,
      {titleModal: 'Seleccionar recurso', personRole: "Staff"},
      {size: 'lg'}
    ).subscribe((result) => {
      this.personCelula.markAsTouched()

      if (!result) return

      this.selectedPerson = result.person
      this.personCelulaFormGroup.patchValue({
        personCelula: `${result.person.name} ${result.person.lastName}`.toUpperCase(),
      })
      this.personCelulaPercentageList$ = this.getPersonCelulaPercentageList()
    })

  }

  getPersonCelulaPercentageList() {
    return from(this._asignacionesService.getPercentageListByPersonId(this.selectedPerson.id))
      .pipe(
        tap((percentageList) => {
          this.totalPercentage = 0
          percentageList.forEach((percentage) => {
            this.totalPercentage += percentage.allocationPercentage
          })
        }),
        catchError((err) => {
          this.setupMessageBar({
            status: "error",
            text: getMessageError(err.response.data)
          })
          return []
        })
      ).toPromise()
  }

  //#region Getters Controls
  get tribuName() {
    return this.personCelulaFormGroup?.get('tribuName') as FormControl;
  }

  get celulaName() {
    return this.personCelulaFormGroup?.get('celulaName') as FormControl;
  }

  get personCelula() {
    return this.personCelulaFormGroup.get('personCelula') as FormControl;
  }

  get assignmentStartDate() {
    return this.personCelulaFormGroup.get('assignmentStartDate') as FormControl;
  }

  get tentativeAssignmentEndDate() {
    return this.personCelulaFormGroup.get('tentativeAssignmentEndDate') as FormControl;
  }

  get allocationPercentage() {
    return this.personCelulaFormGroup.get('allocationPercentage') as FormControl;
  }

  get errorAllocationPercentage() {
    const valid = this.allocationPercentage.invalid && this.allocationPercentage.touched
    if (!valid) return ''

    return this.allocationPercentage.errors?.['required'] ?
      'El porcentaje es requerido.' :
      'Debe ingresar un número del 1 a 100.'

  }

  get errorTentativeAssignmentEndDate() {
    const valid = this.tentativeAssignmentEndDate.invalid && this.tentativeAssignmentEndDate.touched
    if (!valid) return ''

    if (this.tentativeAssignmentEndDate.errors?.['required']) return 'La fecha es requerida.'

    if (this.tentativeAssignmentEndDate.errors?.['date']) return 'La fecha es invalida.'

  }

  //#endregion

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }
}
