import {from} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {getMessageError, getToday} from "../common/utils/fn";
import {PersonService} from "@services/person.service";
import {CelulaService} from "@services/celula.service";

export function ValidatorsPEmail(_personService: PersonService, emailSelect: string): AsyncValidatorFn {

  return (control: AbstractControl) => {
    if (control.value == emailSelect) {
      return from([null])
    } else {
      return from(_personService.validateEmailPerson(control.value))
        .pipe(
          map(() => null),
          catchError(error => {
              return [{validatemail: getMessageError(error.response.data)}]
            }
          )
        )
    }
  }
}

export function ValidatorsCelulaNameProduct(_celulaService: CelulaService, nameSelectedCelulaProduct: string): AsyncValidatorFn {

  return (control: AbstractControl) => {
    if (control.value == nameSelectedCelulaProduct) {
      return from([null])
    } else {
      return from(_celulaService.validateCelulaNameProduct(control.value))
        .pipe(
          map(() => null),
          catchError(error => {
              return [{validateCelulaNameProduct: getMessageError(error.response.data)}]
            }
          )
        )
    }
  }
}

export function ValidateDateTribus(): ValidatorFn {

  return (control: AbstractControl) => {
    if (control.get('tribuFinishDate')?.value > control.get('tribuCreationDate')?.value ||
      control.get('tribuFinishDate')?.value == "" ||
      control.get('tribuFinishDate')?.value == null) {
      return null
    } else {
      return ({ValidateDate: true})
    }
  }
}

export function ValidateDateCelulas(): ValidatorFn {

  return (control: AbstractControl) => {
    if (control.get('celulaFinishDate')?.value > control.get('celulaCreationDate')?.value ||
      control.get('celulaFinishDate')?.value == "" ||
      control.get('celulaFinishDate')?.value == null) {
      return null
    } else {
      return ({ValidateDate: true})
    }
  }
}

export function ValidateDatePerson(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value <= getToday() || control.value == null) {
      return null
    } else {
      return ({ValidateDate: true})
    }
  }
}
