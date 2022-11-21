import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "@modal/dialog.service";
import {Tribu} from '@interfaces/tribu';
import {ValidateDateTribus} from '../../../../validators/validators';
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError, getToday} from '../../../../common/utils/fn';
import {TribuService, UtilitaryService,} from '@services/index';
import {from, of} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";

export interface ModelDialog {
  titleModal: string,
  data: Tribu,
}

@Component({
  selector: 'app-form-tribus-modal',
  templateUrl: './form-tribus-modal.component.html',
  styleUrls: ['./form-tribus-modal.component.scss']
})
export class FormTribusModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  titleModal: string;
  data: Tribu;
  editForm: boolean = false
  tribusFormGroup: FormGroup

  constructor(
    dialogService: DialogService,
    private _utilitaryService: UtilitaryService,
    private tribuService: TribuService,
    private formBuilder: FormBuilder
  ) {
    super(dialogService)
  }

  ngOnInit(): void {
    this.buidForm()
    this.setData()
  }

  setData() {
    if (!this.data) return

    this.editForm = true
    this.tribusFormGroup?.patchValue({
      tribuName: this.data.tribuName,
      tribuCreationDate: this.data.tribuCreationDate,
      tribuFinishDate: this.data.tribuFinishDate,
      tribuDescription: this.data.description,
      user: this.data.user,
      state: this.data.state
    })
  }

  buidForm() {
    this.tribusFormGroup = this.formBuilder.group({
        tribuName: ['', {
          validators: [Validators.required, Validators.maxLength(50)],
          asyncValidators: [this.validatorsTribuName()],
        }],
        tribuCreationDate: [getToday(), [Validators.required]],
        tribuFinishDate: [null, Validators.compose([])],
        tribuDescription: [null, [Validators.maxLength(256)]],
        user: ['luischi'],
        state: ['ACTIVO'],
      },
      {
        validators: ValidateDateTribus()
      });
  }

  onSubmit() {
    const submitTibu = {
      ...this.tribusFormGroup.getRawValue(),
      tribuName: this.tribuName.value.toUpperCase(),
      tribuFinishDate: this.tribuFinishDate?.value == "" ? null : this.tribuFinishDate?.value,
      description: this.tribuDescription?.value == "" ? null : this.tribuDescription?.value,
    }

    const promise = (this.editForm) ? this.tribuService.updateTribu(submitTibu, this.data.id)
      : this.tribuService.addTribu(submitTibu)

    promise
      .then(() => {
        this.result = {
          status: "success",
          text: `Tribu ${this.editForm ? 'actualizada' : 'creada'} exitosamente!`
        }
      })
      .catch((err) => {
        this.result = {
          status: "error",
          text: getMessageError(err.response.data)
        }
      })
      .finally(() => {
        this.close()
      })
  }

  //#region Getters Setters
  get tribuName() {
    return this.tribusFormGroup.get('tribuName');
  }

  get tribuCreationDate() {
    return this.tribusFormGroup.get('tribuCreationDate');
  }

  get tribuFinishDate() {
    return this.tribusFormGroup.get('tribuFinishDate')
  }

  get tribuDescription() {
    return this.tribusFormGroup.get('tribuDescription');
  }

  //#endregion


  validatorsTribuName() {
    return (control: AbstractControl) => {
      const valueNameProduct = control.value
      if (valueNameProduct == this.data?.tribuName) {
        return from([null])
      }

      return control.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(value => this.tribuService.validateTribuName(value)),
          map(() => null),
          catchError(
            (error) => of({
              'validateTribuName': getMessageError(error.response.data)
            })
          ),
          first()// important to make observable finite
        );
    }
  }

}
