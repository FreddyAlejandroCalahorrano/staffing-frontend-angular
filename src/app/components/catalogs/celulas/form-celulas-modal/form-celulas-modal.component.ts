import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "@modal/dialog.service";
import {Celula} from "@interfaces/celula";
import {CelulaService, TribuService} from '@services/index';
import {ValidateDateCelulas} from '../../../../validators/validators';
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError, getToday} from '../../../../common/utils/fn';
import {from, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";

export interface ModelDialog {
  titleModal: string,
  celula: Celula,
}

@Component({
  selector: 'app-form-celulas-modal',
  templateUrl: './form-celulas-modal.component.html',
  styleUrls: ['./form-celulas-modal.component.scss']
})
export class FormCelulasModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  titleModal: string;
  celula: Celula
  tribusCatalog: Observable<any[]>
  isEdit: boolean = false
  celulasFormGroup: FormGroup

  constructor(
    dialogService: DialogService,
    private celulaService: CelulaService,
    private formBuilder: FormBuilder,
    private tribuService: TribuService,
  ) {
    super(dialogService)
  }

  ngOnInit(): void {
    this.buildForm()
    this.tribusCatalog = from(this.tribuService.getTribu())
    if (this.celula) {
      this.isEdit = true
    }
    this.editData(this.isEdit)
  }

  editData(isEdit: boolean) {
    if (!isEdit) return
    setTimeout(() => {
      this.celulasFormGroup.patchValue({
        celulaNameSquad: this.celula.celulaNameSquad,
        celulaNameProduct: this.celula.celulaNameProduct,
        celulaCreationDate: this.celula.celulaCreationDate,
        celulaFinishDate: this.celula.celulaFinishDate,
        description: this.celula.description,
        idTribu: this.celula?.idTribu,
        user: this.celula.user,
        state: this.celula.state,
      })
    }, 1000)
  }

  buildForm() {
    this.celulasFormGroup = this.formBuilder.group({
        celulaNameProduct: ['', {
          validators: [Validators.required],
          asyncValidators: [
            this.validateNameProduct()
          ],
        }],
        celulaNameSquad: ['', {
          validators: [Validators.required],
        }],
        celulaCreationDate: [getToday(), [Validators.required]],
        celulaFinishDate: ['', []],
        description: ['', [Validators.maxLength(256)]],
        idTribu: ['', [Validators.required]],
        user: [{value: 'luischi', disabled: true}],
        state: [{value: 'ACTIVO', disabled: true}],
      },
      {
        validators: ValidateDateCelulas(),
      })
  }

  validateNameProduct() {
    return (control: AbstractControl) => {
      const valueNameProduct = control.value
      if (valueNameProduct == this.celula?.celulaNameProduct) {
        return from([null])
      }

      return control.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(value => this.celulaService.validateCelulaNameProduct(value)),
          map(() => null),
          catchError(
            (error) => of({
              'validateCelulaNameProduct': getMessageError(error.response.data)
            })
          ),
          first()// important to make observable finite
        );
    }
  }

  onSubmit() {
    this.celulasFormGroup.markAllAsTouched()
    this.celulasFormGroup.updateValueAndValidity()
    if (this.celulasFormGroup.invalid) return
    let submitCatalogCelula: Celula = this.getDataRequest(this.isEdit)

    const promiseEditAdd = (this.isEdit) ?
      this.celulaService.updateCelulaById(submitCatalogCelula.id, submitCatalogCelula)
      : this.celulaService.addCelula(submitCatalogCelula)

    promiseEditAdd
      .then(() => {
          this.result = {
            status: "success",
            text: this.isEdit ? "Célula actualizada exitosamente!" : "Célula guardada exitosamente!"
          }
          this.close()
        }
      )
      .catch((err) => {
          this.result = {
            status: "error",
            text: getMessageError(err.response?.data)
          }
          this.close()
        }
      )
  }

  getDataRequest(isEdit: boolean) {
    const {
      celulaNameProduct,
      celulaFinishDate,
      description,
      celulaNameSquad,
    } = this.celulasFormGroup.getRawValue()
    let submitCelula: Celula = {
      ...this.celulasFormGroup.getRawValue(),
      celulaNameSquad: celulaNameSquad.toUpperCase(),
      celulaNameProduct: celulaNameProduct.toUpperCase(),
      celulaFinishDate: celulaFinishDate == "" ? null : celulaFinishDate,
      description: description == "" ? null : description,
    }
    if (isEdit) {
      submitCelula = {
        ...submitCelula,
        id: this.celula.id,
        state: this.celula.state
      }
    }
    return submitCelula
  }


  get celulaNameSquad() {
    return this.celulasFormGroup.get('celulaNameSquad')
  }

  get celulaNameProduct() {
    return this.celulasFormGroup.get('celulaNameProduct')
  }

  get celulaCreationDate() {
    return this.celulasFormGroup.get('celulaCreationDate')
  }

  get celulaFinishDate() {
    return this.celulasFormGroup.get('celulaFinishDate')
  }

  get idTribu() {
    return this.celulasFormGroup.get('idTribu')
  }

  get description() {
    return this.celulasFormGroup.get('description')
  }

}
