import {FormControl, FormGroup} from "@angular/forms";
import {
  ValidateDateCelulas,
  ValidateDatePerson,
  ValidateDateTribus,
  ValidatorsCelulaNameProduct,
  ValidatorsPEmail
} from "./validators";
import {getToday} from "../common/utils/fn";
import Mocked = jest.Mocked;

describe('Validators', () => {

  let personServiceMock: Mocked<any> = {
    validateIdentificationCard: jest.fn(),
    validateEmailPerson: jest.fn()
  }

  let celulaServiceMock: Mocked<any> = {
    validateCelulaNameProduct: jest.fn(),
  }

  it('should give false fn[ValidateDateTribus]', () => {
    let formGroup = new FormGroup({
      ['tribuCreationDate']: new FormControl('2021-01-01'),
      ['tribuFinishDate']: new FormControl('2021-05-01'),
    }, ValidateDateTribus());
    expect(formGroup.hasError('ValidateDate')).toBeFalsy()
  })

  it('should give true fn[ValidateDateTribus]', () => {
    let formGroup = new FormGroup({
      ['tribuCreationDate']: new FormControl('2022-01-01'),
      ['tribuFinishDate']: new FormControl('2021-05-01'),
    }, ValidateDateTribus());
    expect(
      formGroup.hasError('ValidateDate')
    ).toBeTruthy()
  })

  it('should give false fn[ValidateDateCelulas]', () => {
    let formGroup = new FormGroup({
        ['celulaCreationDate']: new FormControl('2021-05-01'),
        ['celulaFinishDate']: new FormControl('2022-01-01'),
      },
      ValidateDateCelulas());
    expect(formGroup.hasError('ValidateDate')).toBeFalsy()
  })

  it('should give true fn[ValidateDateCelulas]', () => {
    let formGroup = new FormGroup({
        ['celulaCreationDate']: new FormControl('2022-01-01'),
        ['celulaFinishDate']: new FormControl('2021-05-01'),
      },
      ValidateDateCelulas());
    expect(formGroup.hasError('ValidateDate')).toBeTruthy()
  })

  it('should give false fn[ValidateDatePerson]', () => {
    let bornDateControl = new FormControl(getToday(), ValidateDatePerson())
    expect(bornDateControl.hasError('ValidateDate')).toBeFalsy()
  })

  it('should give true fn[ValidateDatePerson]', () => {
    let bornDateControl = new FormControl('2100-01-01', ValidateDatePerson())
    expect(bornDateControl.hasError('ValidateDate')).toBeTruthy()
  })


  it('should give false if new name squad is equal to old name squad in fn[ValidatorsCelulaNameProduct]', () => {
    let celulaNameSquadControl =
      new FormControl('test celula name', {
        asyncValidators: [ValidatorsCelulaNameProduct(
          null,
          'test celula name')]
      })
    expect(celulaNameSquadControl.hasError('validateCelulaNameProduct')).toBeFalsy()
  })

  it('should give false fn[ValidatorsCelulaNameProduct]', (done) => {

    celulaServiceMock.validateCelulaNameProduct.mockReturnValue('El recurso con la celula Cash es válido')

    let celulaNameSquadControl =
      new FormControl('Cash', {
        asyncValidators: [ValidatorsCelulaNameProduct(
          celulaServiceMock,
          'test celula name')]
      })

    setTimeout(() => {
      expect(celulaNameSquadControl.hasError('validateCelulaNameProduct')).toBeFalsy()
      expect(celulaServiceMock.validateCelulaNameProduct).toHaveBeenCalled()
      done()
    })
  })

  it('should give true fn[ValidatorsCelulaNameProduct]', (done) => {

    celulaServiceMock.validateCelulaNameProduct.mockRejectedValue({response: {data: 'El recurso con Celula CASH no es válido'}})

    let celulaNameSquadControl =
      new FormControl('CASH', {
        asyncValidators: [ValidatorsCelulaNameProduct(
          celulaServiceMock,
          'test celula name')]
      })

    setTimeout(() => {
      expect(celulaNameSquadControl.hasError('validateCelulaNameProduct')).toBeTruthy()
      expect(celulaServiceMock.validateCelulaNameProduct).toHaveBeenCalled()
      done()
    })
  })

  it('should give false if new email is equal to old email in fn[ValidatorsPEmail]', () => {
    let emailControl =
      new FormControl('test@mail.com', {
        asyncValidators: [ValidatorsPEmail(
          null,
          'test@mail.com')]
      })
    expect(emailControl.hasError('validatemail')).toBeFalsy()
  })

  it('should give false fn[ValidatorsPEmail]', (done) => {

    personServiceMock.validateEmailPerson.mockReturnValue('El recurso con el Email test@mail.com es válido')

    let emailControl =
      new FormControl('test@mail.com', {
        asyncValidators: [ValidatorsPEmail(
          personServiceMock,
          'tes2t@mail.com')]
      })

    setTimeout(() => {
      expect(emailControl.hasError('validatemail')).toBeFalsy()
      expect(personServiceMock.validateEmailPerson).toHaveBeenCalled()
      done()
    })
  })

  it('should give true fn[ValidatorsPEmail]', (done) => {

    personServiceMock.validateEmailPerson.mockRejectedValue({response: {data: 'El recurso con el Email test@mail.com no es válido'}})

    let emailControl =
      new FormControl('test@mail.com', {
        asyncValidators: [ValidatorsPEmail(
          personServiceMock,
          'tes2t@mail.com')]
      })

    setTimeout(() => {
      expect(emailControl.hasError('validatemail')).toBeTruthy()
      expect(personServiceMock.validateEmailPerson).toHaveBeenCalled()
      done()
    })
  })

});
