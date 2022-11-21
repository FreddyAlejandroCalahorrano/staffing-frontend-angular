import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AsignacionesCelulasComponent} from './asignaciones-celulas.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from '@pichincha/angular-sdk/http';
import {AsignacionesCelulasService} from '@services/asignaciones-celulas.service';
import {CelulaService} from '@services/celula.service';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../common/components/common.module";
import {BootstrapModalModule} from "@modal/bootstrap-modal.module";
import {MessageBarService} from "@services/message-bar.service";
import {of} from "rxjs";
import {DialogService} from "@modal/dialog.service";
import {Router} from "@angular/router";

describe('AsignacionesCelulasComponent', () => {
  let component: AsignacionesCelulasComponent;
  let fixture: ComponentFixture<AsignacionesCelulasComponent>;
  let mockedCelulaService = {
    getCelulas: jest.fn().mockImplementation(() => Promise.resolve())
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedAsignmentCelula = {
    deletePersonCelula: jest.fn(),
    getPersonCelulaSearchPaged: jest.fn().mockImplementation(() => Promise.resolve())
  }
  let mockedMessageService = {
    showMessage: jest.fn()
  }
  let router: Router


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
        BootstrapModalModule,
      ],
      declarations: [AsignacionesCelulasComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: CelulaService, useValue: mockedCelulaService},
        {provide: DialogService, useValue: mockedDialogService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: AsignacionesCelulasService, useValue: mockedAsignmentCelula }

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesCelulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router)
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called "addDialog" when delete person celula', () => {
    const dataDelete = {
      assignmentEndDate: '2022-06-06'
    }

    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          confirm: true, date: '2022-10-10'
        })
      )

    mockedAsignmentCelula.deletePersonCelula
      .mockImplementation(() => Promise.resolve({}))

    component.onDeletePersonCelulaClick(dataDelete)

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedAsignmentCelula.deletePersonCelula
    ).toBeCalled()
  });

  it('should called method "next" from [dataPaginationPersonCelula$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataPaginationPersonCelula$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })

  it('should navigate edit PersonCelula when called "onEditPersonCelulaClick" not with parameter', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onAddPersonCelulaClick()
    expect(
      navigateSpy
    ).toHaveBeenCalledWith(['/asignaciones/celulas/crear']);

  });

  it('should navigate edit PersonCelula when called "onEditPersonCelulaClick" with parameter id ', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true))

    component.onEditPersonCelulaClick(1)
    expect(
      navigateSpy
    ).toHaveBeenCalledWith(['/asignaciones/celulas/editar/' + 1]);

  })

});
