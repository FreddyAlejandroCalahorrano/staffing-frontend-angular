import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AsignacionesTribusComponent} from './asignaciones-tribus.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from '@pichincha/angular-sdk/http';
import {RouterTestingModule} from "@angular/router/testing";
import {AsignacionesTribusService} from '@services/asignaciones-tribus.service';
import {TribuService} from '@services/tribu.service';
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";

describe('AsignacionesTribusComponent', () => {
  let component: AsignacionesTribusComponent;
  let fixture: ComponentFixture<AsignacionesTribusComponent>;
  let router: Router
  let mockedMessageService = {
    showMessage: jest.fn()
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedAsignacionesTribusService = {
    deletePersonTribu: jest.fn(),
    getPersonTribuSearchPaged: jest.fn()
      .mockImplementation(() => Promise.resolve([]))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        AsignacionesTribusComponent,
      ],
      providers: [
        TribuService,
        {provide: AsignacionesTribusService, useValue: mockedAsignacionesTribusService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesTribusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    router.initialNavigation();
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called "addDialog" when delete person tribu', () => {
    const dataDelete = {
      assignmentEndDate: '2022-06-06'
    }

    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          confirm: true, date: '2022-10-10'
        })
      )

    mockedAsignacionesTribusService.deletePersonTribu
      .mockImplementation(() => Promise.resolve({}))

    component.onDeletePersonTribuClick(dataDelete)

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedAsignacionesTribusService.deletePersonTribu
    ).toBeCalled()
  })

  it('should navigate edit PersonTribu when called "onEditPersonTribu" with parameter id ', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onAddOrEditPersonTribu(1)
    expect(
      navigateSpy
    ).toHaveBeenCalledWith(['/asignaciones/tribus/editar/' + 1]);

  })

  it('should navigate edit PersonTribu when called "onEditPersonTribu" not with parameter', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onAddOrEditPersonTribu()
    expect(
      navigateSpy
    ).toHaveBeenCalledWith(['/asignaciones/tribus/crear']);

  });

  it('should called method "next" from [dataPaginationPersonTribu$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataPaginationPersonTribu$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })


  it('should called "addDialog" when delete person tribu in status error', () => {
    const dataDelete = {
      assignmentEndDate: '2022-06-06'
    }

    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          confirm: true, date: '2022-10-10'
        })
      )

    mockedAsignacionesTribusService.deletePersonTribu
      .mockImplementation(() => Promise.reject({response: ''}))

    component.onDeletePersonTribuClick(dataDelete)

    expect(
      mockedAsignacionesTribusService.deletePersonTribu
    ).toBeCalled()
  });

  it('should throw error in method "getPersonTribuSearchPaged" when emit value BehaviorSubject(dataPaginationPersonTribu$)', (done) => {
    const spyMethod = mockedAsignacionesTribusService.getPersonTribuSearchPaged
      .mockRejectedValue({})

    component.dataPaginationPersonTribu$
      .pipe(first())
      .subscribe({
        error: ()=>{
          console.log("ERROR")
          expect(
            spyMethod
          ).toBeCalled();
          done()
        },
        complete: () => done(),
      })

    component.dataPaginationPersonTribu$.next({size: 5, page: 1})
  })



  it('should change the state of the variable "currentPage" to 1', () => {
    component.tribuFilter.patchValue('Todas')
    fixture.detectChanges()
    component.registerEvents()
    expect(component.currentPage).toEqual(1)
  })

});
