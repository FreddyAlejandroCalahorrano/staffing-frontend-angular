import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormAsignacionesTribusComponent} from './form-asignaciones-tribus.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapModalModule} from "@modal/bootstrap-modal.module";
import {CustomCommonModule} from "../../../../common/components/common.module";
import {AsignacionesTribusService} from '@services/asignaciones-tribus.service';
import {MessageBarService} from '../../../../services';
import {getToday} from "../../../../common/utils/fn";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('FormAsignacionesTribusComponent', () => {
  let component: FormAsignacionesTribusComponent;
  let fixture: ComponentFixture<FormAsignacionesTribusComponent>;
  let mockedDialogService = {
    addDialog: jest.fn()
  };
  let router: Router;
  let mockedMessageService = {
    showMessage: jest.fn()
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAsignacionesTribusComponent],
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        CustomCommonModule,
      ],
      providers: [AsignacionesTribusService,
        {provide: DialogService, useValue: mockedDialogService},
        {provide: MessageBarService, useValue: mockedMessageService}

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAsignacionesTribusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tribus = [
      {
        "id": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "tribuCreationDate": "2021-11-16",
        "tribuFinishDate": "2022-11-16",
        "description": "Business Capabilities",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 1,
        "tribuName": "EMPRESA",
        "tribuCreationDate": "2020-04-26",
        "tribuFinishDate": null,
        "description": "EMPRESA",
        "user": "luischi",
        "state": "ACTIVO"
      },
    ];
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should created form ', () => {
    let form = component.personTribuFormGroup
    expect(form).toBeTruthy()
  });

  it('the form should be invalid', () => {
    expect(component.personTribuFormGroup.valid).toBeFalsy()
  });

  it('the control "tribuName" should be created', () => {
    let tribuName = component.personTribuFormGroup.controls['tribuName'];
    expect(tribuName).toBeTruthy()
  });

  it('the control "tribuName" should be invalid', () => {
    let tribuName = component.personTribuFormGroup.controls['tribuName'];
    expect(tribuName.errors['required']).toBeTruthy();
  });

  it('the control "tribuName" should be valid', () => {
    let tribuName = component.personTribuFormGroup.controls['tribuName'];
    tribuName.patchValue('EMPRESA');
    expect(tribuName.errors).toBeNull();
  });

  it('the control "personName" should be created', () => {
    let personName = component.personTribuFormGroup.controls['personName'];
    expect(personName).toBeTruthy()
  });

  it('the control "personName" should be invalid', () => {
    let personName = component.personTribuFormGroup.controls['personName'];
    expect(personName.errors['required']).toBeTruthy();
  });

  it('the control "personName" should be valid', () => {
    let personName = component.personTribuFormGroup.controls['personName'];
    personName.patchValue('KEVIN SUAREZ');
    expect(personName.errors).toBeNull();
  });

  it('the control "typeRoleLeader" should be created', () => {
    let typeRoleLeader = component.personTribuFormGroup.controls['typeRoleLeader'];
    expect(typeRoleLeader).toBeTruthy()
  });

  it('the control "typeRoleLeader" should be invalid', () => {
    let typeRoleLeader = component.personTribuFormGroup.controls['typeRoleLeader'];
    expect(typeRoleLeader.errors['required']).toBeTruthy();
  });

  it('the control "typeRoleLeader" should be valid', () => {
    let typeRoleLeader = component.personTribuFormGroup.controls['typeRoleLeader'];
    typeRoleLeader.patchValue('Lider de Tribu');
    expect(typeRoleLeader.errors).toBeNull();
  });

  it('the control "assignmentStartDate" should be created', () => {
    let assignmentStartDate = component.personTribuFormGroup.controls['assignmentStartDate'];
    expect(assignmentStartDate).toBeTruthy()
  });

  it('the control "assignmentStartDate" should be valid', () => {
    let assignmentStartDate = component.personTribuFormGroup.controls['assignmentStartDate'];
    assignmentStartDate.patchValue('2022-05-02');
    expect(assignmentStartDate.value).toEqual('2022-05-02');
  });

  it('the control "assignmentEndDate" should be created', () => {
    let assignmentEndDate = component.personTribuFormGroup.controls['assignmentEndDate'];
    expect(assignmentEndDate).toBeTruthy()
  });

  it('the control "assignmentEndDate" should be valid', () => {
    let assignmentEndDate = component.personTribuFormGroup.controls['assignmentEndDate'];
    assignmentEndDate.patchValue('2022-05-02');
    expect(assignmentEndDate.value).toEqual('2022-05-02');
  });

  it('the form should be valid', () => {
    component.personTribuFormGroup.controls['tribuName'].patchValue('EMPRESA');
    component.personTribuFormGroup.controls['personName'].patchValue('KEVIN SUAREZ');
    component.personTribuFormGroup.controls['typeRoleLeader'].patchValue('Lider de Tribu')
    expect(component.personTribuFormGroup.valid).toBeTruthy()
  });

  it('if no person exists it should return undefined', () => {
    const data = {
      "tribus": [
        {
          "id": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "tribuCreationDate": "2021-11-16",
          "tribuFinishDate": "2022-11-16",
          "description": "Business Capabilities",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 1,
          "tribuName": "EMPRESA",
          "tribuCreationDate": "2020-04-26",
          "tribuFinishDate": null,
          "description": "EMPRESA",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 3,
          "tribuName": "TRIBU PRUEBA",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "Tribu prueba",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 4,
          "tribuName": "TRIBU PRUEBA 2",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "prueba 2",
          "user": "luischi",
          "state": "ACTIVO"
        }
      ],
      "tipoRol": [
        "Lider de Tribu",
        "Lider Tecnico Tribu"
      ]
    }
    let resul = component.editaData(data)
    expect(resul).toEqual(undefined)
  });


  it('I should have changed the name of the person', () => {
    const data = {
      "tribus": [
        {
          "id": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "tribuCreationDate": "2021-11-16",
          "tribuFinishDate": "2022-11-16",
          "description": "Business Capabilities",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 1,
          "tribuName": "EMPRESA",
          "tribuCreationDate": "2020-04-26",
          "tribuFinishDate": null,
          "description": "EMPRESA",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 3,
          "tribuName": "TRIBU PRUEBA",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "Tribu prueba",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 4,
          "tribuName": "TRIBU PRUEBA 2",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "prueba 2",
          "user": "luischi",
          "state": "ACTIVO"
        }
      ],
      "personTribu": {
        "id": 2,
        "assignmentStartDate": "2022-05-05",
        "assignmentEndDate": "2022-11-16",
        "typeRoleLeader": "Lider Tecnico Tribu",
        "personTo": {
          "id": 2,
          "ultimatix": 2070052,
          "name": "FREDDY",
          "lastName": "CALAHORRANO",
          "email": "frcalaho@pichincha.com",
          "bornDate": "1993-03-13",
          "bankEntryDate": "2022-01-03",
          "identificationCard": "1724537301",
          "phoneNumber": "0995470801",
          "homeAddress": "Quicentro Sur",
          "countryTo": {
            "code": "ECU",
            "description": "Ecuador"
          },
          "age": 29,
          "role": "Lider",
          "user": "luischi",
          "state": "ACTIVO",
          "providerTo": {
            "id": 2,
            "providerName": "TCS",
            "user": "luischi",
            "state": "ACTIVO"
          },
          "seniorityTo": {
            "id": 2,
            "seniorityName": "Junior"
          }
        },
        "tribuTo": {
          "id": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "tribuCreationDate": "2021-11-16",
          "tribuFinishDate": "2022-11-16",
          "description": "Business Capabilities",
          "user": "luischi",
          "state": "ACTIVO"
        },
        "user": "LuisChi",
        "state": "ACTIVO"
      },
      "tipoRol": [
        "Lider de Tribu",
        "Lider Tecnico Tribu"
      ]
    }
    component.editaData(data)
    fixture.detectChanges()
    expect(component.personName.value).toEqual(data.personTribu.personTo.name + " " + data.personTribu.personTo.lastName)

  });

  it('the "tipoRol" array should have values', () => {
    const data = {
      "tribus": [
        {
          "id": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "tribuCreationDate": "2021-11-16",
          "tribuFinishDate": "2022-11-16",
          "description": "Business Capabilities",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 1,
          "tribuName": "EMPRESA",
          "tribuCreationDate": "2020-04-26",
          "tribuFinishDate": null,
          "description": "EMPRESA",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 3,
          "tribuName": "TRIBU PRUEBA",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "Tribu prueba",
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 4,
          "tribuName": "TRIBU PRUEBA 2",
          "tribuCreationDate": "2022-05-05",
          "tribuFinishDate": null,
          "description": "prueba 2",
          "user": "luischi",
          "state": "ACTIVO"
        }
      ],
      "personTribu": {
        "id": 2,
        "assignmentStartDate": "2022-05-05",
        "assignmentEndDate": "2022-11-16",
        "typeRoleLeader": "Lider Tecnico Tribu",
        "personTo": {
          "id": 2,
          "ultimatix": 2070052,
          "name": "FREDDY",
          "lastName": "CALAHORRANO",
          "email": "frcalaho@pichincha.com",
          "bornDate": "1993-03-13",
          "bankEntryDate": "2022-01-03",
          "identificationCard": "1724537301",
          "phoneNumber": "0995470801",
          "homeAddress": "Quicentro Sur",
          "countryTo": {
            "code": "ECU",
            "description": "Ecuador"
          },
          "age": 29,
          "role": "Lider",
          "user": "luischi",
          "state": "ACTIVO",
          "providerTo": {
            "id": 2,
            "providerName": "TCS",
            "user": "luischi",
            "state": "ACTIVO"
          },
          "seniorityTo": {
            "id": 2,
            "seniorityName": "Junior"
          }
        },
        "tribuTo": {
          "id": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "tribuCreationDate": "2021-11-16",
          "tribuFinishDate": "2022-11-16",
          "description": "Business Capabilities",
          "user": "luischi",
          "state": "ACTIVO"
        },
        "user": "LuisChi",
        "state": "ACTIVO"
      },
      "tipoRol": [
        "Lider de Tribu",
        "Lider Tecnico Tribu"
      ]
    }
    component.editaData(data)
    fixture.detectChanges()
    expect(component.tipoRol).toEqual([{"rolName": "Lider de Tribu"}, {"rolName": "Lider Tecnico Tribu"}])
  });

  it('check initial values form group person tribu', () => {
    expect(component.tribuName.value).toEqual('');
    expect(component.personName?.value).toEqual('');
    expect(component.typeRoleLeader?.value).toEqual('');
    expect(component.assignmentStartDate?.value).toEqual(getToday())
    expect(component.assignmentEndDate?.value).toEqual('')
  });

  it('Should return tribu by tribu ID', () => {
    expect(component.getTribuByTribuId(2))
      .not
      .toBeNull()
  });

  it('should modal not return nothing', () => {
    const spy = jest.spyOn(mockedDialogService, "addDialog")
      .mockImplementation(() => of(null))
    component.onSearchLiderPersonClick();
    expect(spy).toBeCalled()

  });

  it('should modal return data', () => {
    const person = {
      id: 1,
      name: "Freddy",
      lastName: "Calahorrano"
    }
    const spy = jest.spyOn(mockedDialogService, "addDialog")
      .mockImplementation(() => of({
        person
      }))
    component.onSearchLiderPersonClick();
    expect(spy).toBeCalled()
    expect(component.personTribuFormGroup.getRawValue().personName).toContain(person.name)
    expect(component.personTribu.personTo).toEqual(person)
  });

  it('if sent true the form should contain only the current date', () => {
    const value = {
      tribuName: '',
      personName: '',
      typeRoleLeader: '',
      assignmentStartDate: getToday(),
      assignmentEndDate: '',
      observation: ''
    }
    component.setDataRequest(true)
    expect(component.personTribuFormGroup.getRawValue()).toEqual(value)
  });

  it('if true is sent the personTribu field must contain only the current date', () => {
    component.setDataRequest(false)
    expect(component.personTribu.assignmentStartDate).toEqual(getToday())
  });

  it('I should call navigation', () => {
    const spyRouter = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))
    component.redirectTo()
    expect(spyRouter).toBeCalled()
  })

  it('It should contain only the current date', () => {
    component.isEdit = true
    fixture.detectChanges()
    component.onSubmit()
    expect(component.personTribu.assignmentStartDate).toEqual(getToday())
  })


});
