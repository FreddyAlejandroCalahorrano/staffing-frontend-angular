import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonTribu} from "@interfaces/personTribu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Tribu} from "@interfaces/tribu";
import {DialogService} from "@modal/dialog.service";
import {FormAsignacionesModalComponent} from "../../form-asignaciones-modal/form-asignaciones-modal.component";
import {AsignacionesTribusService} from '@services/asignaciones-tribus.service';
import {getToday} from '../../../../common/utils/fn';
import {MessageBarService} from "@services/message-bar.service";

@Component({
  selector: 'app-form-asignaciones-tribus',
  templateUrl: './form-asignaciones-tribus.component.html',
  styleUrls: ['./form-asignaciones-tribus.component.scss']
})
export class FormAsignacionesTribusComponent implements OnInit {

  personTribuFormGroup: FormGroup

  personTribu: PersonTribu
  isEdit: boolean = false

  tribus: Tribu[]
  tipoRol: string[]


  constructor(
    private aRoute: ActivatedRoute,
    private asignacionesService: AsignacionesTribusService,
    private router: Router,
    private modalBsService: DialogService,
    private formBuilder: FormBuilder,
    private messageBarService: MessageBarService,
  ) {

  }

  ngOnInit(): void {
    this.buildForm()
    const {data} = this.aRoute.snapshot
    this.editaData(data)
  }

  editaData(data: any) {
    this.tribus = data.tribus
    this.tipoRol = data.tipoRol?.map((rol: string) => {
      return {rolName: rol}
    })
    if (!data.personTribu) return
    this.personTribu = data.personTribu
    this.isEdit = true
    this.personTribuFormGroup.patchValue({
      tribuName: data.personTribu.tribuTo.id,
      personName: `${data.personTribu.personTo.name} ${data.personTribu.personTo.lastName}`,
      typeRoleLeader: data.personTribu.typeRoleLeader,
      assignmentStartDate: data.personTribu.assignmentStartDate,
      assignmentEndDate: data.personTribu.assignmentEndDate,
      observation: data.personTribu.observation
    })
  }

  buildForm() {
    this.personTribuFormGroup = this.formBuilder.group({
      tribuName: ['', [Validators.required]],
      personName: ['', [Validators.required]],
      typeRoleLeader: ['', [Validators.required]],
      assignmentStartDate: [getToday()],
      assignmentEndDate: [''],
      observation: ['']
    })
  }

  onSearchLiderPersonClick() {

    this.modalBsService.addDialog(
      FormAsignacionesModalComponent,
      {titleModal: 'Seleccionar recurso', personRole: "Lider"},
      {size: 'lg'}
    ).subscribe((result) => {
      if (result) {
        this.personTribuFormGroup.patchValue({
          personName: `${result.person.name} ${result.person.lastName}`,
        })
        this.personTribu =
          {
            tribuTo: undefined,
            typeRoleLeader: "",
            personTo: result.person,
            assignmentStartDate: "",
            assignmentEndDate: "",
          }
      } else {
        this.personName.markAsTouched()
      }
    })
  }

  onSubmit() {
    this.setDataRequest(this.isEdit)

    const promiseAddEdit = this.isEdit ? this.asignacionesService.updatePersonTribu(this.personTribu) :
      this.asignacionesService.addPersonTribu(this.personTribu)

    promiseAddEdit
      .then(() =>
        this.redirectTo(this.isEdit)
      )
      .catch((err) => {
        this.messageBarService
          .showMessage(err.response.data, "error")
      })

  }

  redirectTo(edit?: boolean) {
    this.router.navigate(['/asignaciones/tribus'],
      {
        state: {
          messageBar: {
            status: "success",
            text: edit ? "Líder asignado con éxito" : "Asignación editada con éxito"
          }
        }
      })
  }

  setDataRequest(edit?: boolean) {
    const {
      typeRoleLeader,
      assignmentStartDate,
      assignmentEndDate,
      tribuName,
      observation
    } = this.personTribuFormGroup.getRawValue()

    this.personTribu = {
      ...this.personTribu,
      user: "luischi",
      typeRoleLeader,
      ...(assignmentStartDate == "" ? null : {assignmentStartDate}),
      ...(assignmentEndDate == "" ? null : {assignmentEndDate}),
      observation,
    }

    if (!edit)
      this.personTribu = {
        ...this.personTribu,
        tribuTo: this.getTribuByTribuId(tribuName)
      }
  }

  get tribuName() {
    return this.personTribuFormGroup.get('tribuName')
  }

  get personName() {
    return this.personTribuFormGroup.get('personName')
  }

  get typeRoleLeader() {
    return this.personTribuFormGroup.get('typeRoleLeader')
  }

  get assignmentStartDate() {
    return this.personTribuFormGroup.get('assignmentStartDate')
  }

  get assignmentEndDate() {
    return this.personTribuFormGroup.get('assignmentEndDate')
  }

  get observation() {
    return this.personTribuFormGroup.get('observation')
  }

  getTribuByTribuId(id: number) {
    return this.tribus.filter((tribu: Tribu) => {
      return tribu.id == id
    })[0]
  }


}
