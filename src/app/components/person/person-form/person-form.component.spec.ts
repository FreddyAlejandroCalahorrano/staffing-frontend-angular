import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {PersonFormComponent} from './person-form.component';
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
import {RouterTestingModule} from '@angular/router/testing';
import {InputValueAcessorDirective} from "../../../common/directives/input-value-accessor.directive";
import {Router} from "@angular/router";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";

describe('FormPersonComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let router: Router;

  //#region MockService
  let mockedMessageService = {
    showMessage: jest.fn()
  }

  let mockedDialogService = {
    addDialog: jest.fn()
  }

  let mockedProfileService = {
    getProfiles: jest.fn()
  }

  let mockedChapterService = {
    getChapters: jest.fn()
  }

  let mockedPersonService = {
    addPerson: jest.fn(),
    updatePerson: jest.fn(),
    validateEmailPerson: jest.fn().mockImplementation(() => Promise.resolve(null))
  }
  //#endregion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [PersonFormComponent, InputValueAcessorDirective],
      providers: [
        CountryService,
        RolesService,
        ProvidersService,
        SeniorityService,
        {provide: PersonService, useValue: mockedPersonService},
        {provide: ProfilesService, useValue: mockedProfileService},
        {provide: ChapterService, useValue: mockedChapterService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called navigate router when called method [redirectTo]', () => {
    const spyRoute = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))
    component.redirectTo()
    expect(spyRoute).toBeCalled()
  })

  it('should called showMessage when called method [redirectTo]', () => {
    jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    const spyShowMessage = jest.spyOn(mockedMessageService, 'showMessage')
    component.redirectTo()
    expect(spyShowMessage).toBeCalled()
  })

  it('should defined controls', () => {
    expect(
      component.bornDay
    ).toBeDefined()
    expect(
      component.bornMonth
    ).toBeDefined()
    expect(
      component.name
    ).toBeDefined()

    expect(component.lastName).toBeDefined()
    expect(component.email).toBeDefined()
    expect(component.role).toBeDefined()
    expect(component.phoneNumber).toBeDefined()
    expect(component.codeCountry).toBeDefined()
    expect(component.providerTo).toBeDefined()
  })

  it('should return array day when month change', () => {

    const monthFebruary = component.listBornMonth.find(month => month.value == 2)

    component.bornMonth.setValue(monthFebruary.value)
    expect(
      component.listBornDay
    ).toHaveLength(monthFebruary.maxDay)

  })

  it('should called methods(addDialog, addPerson) when onSubmit', () => {
    component.personFormGroup.patchValue(
      {
        "name": " KONDRAMUTLA",
        "lastName": "ADITYA",
        "email": "akondram@pichincha.com",
        "role": "Staff",
        "phoneNumber": "0981565680",
        "bankEntryDate": null,
        "user": "luischi",
        "state": "ACTIVO",
        "ultimatix": 534040,
        "codeCountry": "ECU",
        "idProvider": 2,
        "idSeniority": 4,
        "idProfile": 2,
        "idChapter": 1,
        "bornMonth": null,
        "bornDay": null
      }
    )
    mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    mockedPersonService.addPerson
      .mockImplementation(() => Promise.resolve())

    jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onSubmit()

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedPersonService.addPerson
    ).toBeCalled()

  })

});
