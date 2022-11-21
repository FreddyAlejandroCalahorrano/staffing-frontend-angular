import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormAsignacionesCelulasComponent} from './form-asignaciones-celulas.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../../common/components/common.module";
import {AsignacionesCelulasService, CelulaService, MessageBarService, TribuService,} from "@services/index";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonCelula} from "@interfaces/personCelula";
import {getToday} from "../../../../common/utils/fn";


describe('FormAsignacionesCelulasComponent', () => {
  let component: FormAsignacionesCelulasComponent;
  let fixture: ComponentFixture<FormAsignacionesCelulasComponent>;
  const route = ({ snapshot:
  {
    data: of({personCelula: {}})
  } } as any) as ActivatedRoute;

  let mockedAsignacionesCelulaService = {
    addPersonCelula: jest.fn(),
    updatePersonCelula: jest.fn(),
    getPercentageListByPersonId: jest.fn()
  }

  let mockedCelulaService = {
    getCelulaByTribu: jest.fn()
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedMessageService = {
    showMessage: jest.fn()
  }

  let personCelula: PersonCelula =
  {
    "id": 4,
    "assignmentStartDate": "2021-02-11",
    "assignmentEndDate": null,
    "tentativeAssignmentEndDate": "2022-10-10",
    "allocationPercentage": 60,
    "personTo": {
    "id": 1,
      "ultimatix": null,
      "name": "KEVIN BRYAN",
      "lastName": "SUAREZ GUZMAN",
      "email": "ksuarezg@pichincha.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": null,
      "phoneNumber": "0986735012",
      "codeCountry": "ECU",
      "role": "Lider",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 2,
      "idSeniority": 4,
      "idChapter": 1,
      "idProfile": 7,
      "profileName": "PO",
      "chapterName": "Chapter Frontend"
  },
    "celulaTo": {
    "id": 1,
      "celulaCreationDate": "2022-04-26",
      "celulaFinishDate": null,
      "celulaNameSquad": "CASH",
      "celulaNameProduct": "CASH",
      "description": "CASH NEGOCIOS",
      "idTribu": 4,
      "tribuName": "TRIBU PRUEBA 2",
      "user": "luischi",
      "state": "ACTIVO"
  },
    "user": "luischi",
    "state": "ACTIVO"
  };

  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      declarations: [FormAsignacionesCelulasComponent],
      providers: [
        TribuService,
        {provide: AsignacionesCelulasService, useValue: mockedAsignacionesCelulaService },
        {provide: CelulaService, useValue: mockedCelulaService},
        {provide: DialogService, useValue: mockedDialogService},
        {provide: MessageBarService, useValue: mockedMessageService},
        { provide: ActivatedRoute, useValue: route }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAsignacionesCelulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modal not return nothing', () => {

    const spy = jest.spyOn(mockedDialogService, 'addDialog')
      .mockImplementation(() => of(null))

    component.onSearchStaffPersonClick();

    expect(spy).toBeCalled()
    expect(component.selectedPerson).toBeUndefined()
  });

  it('should modal return data', () => {

    const person = {
      id: 0,
      name: 'kevin',
      lastName: 'suarez',
    }
    const spy = jest.spyOn(mockedDialogService, 'addDialog')
      .mockImplementation(() => of({
        person
      }))

    component.onSearchStaffPersonClick();

    expect(spy).toBeCalled()
    expect(component.selectedPerson).toEqual(person)
    expect(component.personCelula.value)
      .toContain(person.name.toUpperCase())
  });

  it('should created form ', () => {
    let form = component.personCelulaFormGroup
    expect(form).toBeTruthy()

  });

  it('check initial values form group person celula', () => {
    expect(component.tribuName.value).toEqual('');
    expect(component.celulaName.value).toEqual('');
    expect(component.personCelula.value).toEqual('');
    expect(component.assignmentStartDate.value).toEqual(getToday());
    expect(component.tentativeAssignmentEndDate.value).toEqual('');
    expect(component.allocationPercentage.value).toEqual('');
  });

  it('shoud called method "getCelulaByTribu" when control "tribuName" changes', () => {
    const spy = jest.spyOn(mockedCelulaService, 'getCelulaByTribu')
    component.tribuName.setValue(1);
    expect(spy).toBeCalled();
  });

  it('should called showMessage', () => {
    const spy = jest.spyOn(mockedMessageService, 'showMessage')
    component.setupMessageBar({text: '', status: 'success'})
    expect(spy).toBeCalled();
  });

  it('it should have the id of the selected tribu and it should change the state of the isEdit variable', () => {
    component.editData(personCelula)
    expect(component.tribuName.value).toEqual(personCelula.celulaTo.idTribu)
    expect(component.isEdit).toBeTruthy()
  });

  it('should call the method "updatePersonCelula" in status error', () => {
    component.isEdit= true
    component.listCelulas = [
      {
        "id": 1,
        "celulaCreationDate": "2022-04-26",
        "celulaFinishDate": null,
        "celulaNameSquad": "CASH",
        "celulaNameProduct": "CASH",
        "description": "CASH NEGOCIOS",
        "idTribu": 4,
        "tribuName": "TRIBU PRUEBA 2",
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    component.selectedPersonCelula = personCelula
    component.selectedPerson = personCelula.personTo
    component.personCelulaFormGroup.patchValue({
      tribuName: 'TRIBU PRUEBA 2',
      celulaName: 1,
      personCelula: 'NA',
      assignmentStartDate: '2021-11-16',
      tentativeAssignmentEndDate: '2100-11-16',
      allocationPercentage: '50',
    })
    const spy = jest.spyOn(mockedAsignacionesCelulaService, "updatePersonCelula")
      .mockImplementation(() => Promise.reject({response:{data :''}}))
    component.onSubmit()
    expect(spy).toBeCalled()
  });

  it('should call the navigate method', () => {
    const spyRouter = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))
    component.redirectTo(true)
    expect(spyRouter).toBeCalled()
  });

  it('should call method "getPercentageListByPersonId" in correct state', () => {
    component.selectedPerson = {
      "id": 33,
      "ultimatix": 12313,
      "name": "HEYDI",
      "lastName": "LITARDO",
      "email": "hjjjj@gmail.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": "2022-05-25",
      "phoneNumber": "0986735012",
      "codeCountry": "AND",
      "role": "Staff",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 2,
      "idSeniority": 2,
      "idChapter": 1,
      "idProfile": 1,
      "profileName": "Dev Front",
      "chapterName": "Chapter Frontend"
    }
    const spy = jest.spyOn(mockedAsignacionesCelulaService, 'getPercentageListByPersonId' )
      .mockImplementation(() => Promise.resolve(Promise.resolve([
        {
          "celula": "PRUEBA22",
          "allocationPercentage": 24
        }
      ])))
    component.getPersonCelulaPercentageList()
    expect(spy).toBeCalled()
  });

  it('should call method "getPercentageListByPersonId" in error state', () => {
    component.selectedPerson = {
      "id": 33,
      "ultimatix": 12313,
      "name": "HEYDI",
      "lastName": "LITARDO",
      "email": "hjjjj@gmail.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": "2022-05-25",
      "phoneNumber": "0986735012",
      "codeCountry": "AND",
      "role": "Staff",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 2,
      "idSeniority": 2,
      "idChapter": 1,
      "idProfile": 1,
      "profileName": "Dev Front",
      "chapterName": "Chapter Frontend"
    }
    const spy = jest.spyOn(mockedAsignacionesCelulaService, 'getPercentageListByPersonId' )
      .mockImplementation(() => Promise.reject({response: ""}))
    component.getPersonCelulaPercentageList()
    expect(spy).toBeCalled()
  });

});
