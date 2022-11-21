import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CelulasComponent} from './celulas.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CelulaService} from '@services/celula.service';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CustomCommonModule} from "../../../common/components/common.module";
import {MessageBarService} from "@services/message-bar.service";
import {of} from "rxjs";
import {DialogService} from "@modal/dialog.service";

describe('CelulasComponent', () => {
  let component: CelulasComponent;
  let fixture: ComponentFixture<CelulasComponent>;
  let mockedDialogService = {
    addDialog: jest.fn()
  };
  let mockedCelulaService = {
    updateCelulaById: jest.fn(),
  };
  let mockedMessageService = {
    showMessage: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        CustomCommonModule,
      ],
      declarations: [CelulasComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: DialogService, useValue: mockedDialogService},
        {provide: CelulaService, useValue: mockedCelulaService },
        {provide: MessageBarService, useValue: mockedMessageService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called "addDialog" when edit celula', () => {
    const dataModal = {
        "id": 1,
        "celulaCreationDate": "2022-04-26",
        "celulaFinishDate": "2030-04-26",
        "celulaNameSquad": "CASH",
        "celulaNameProduct": "CASH",
        "description": "CASH NEGOCIOS",
        "idTribu": 4,
        "tribuName": "TRIBU PRUEBA 2",
        "user": "luischi",
        "state": "ACTIVO"
    }
    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          status: "success",
          text: "Célula actualizada exitosamente!"
        })
      )
    component.onClickEdit(dataModal)
    expect(
      mockedDialogService.addDialog
    ).toBeCalled()
  });

  it('should called "addDialog" when delete celula', () => {
    const dataModal : any = {
      action: "DELETE",
      rowData: {
        id: 1,
        celulaCreationDate: "2022-04-26",
        celulaFinishDate: null,
        celulaNameSquad: "CASH",
        celulaNameProduct: "CASH",
        description: "CASH NEGOCIOS",
        idTribu: 4,
        tribuName: "TRIBU PRUEBA 2",
        user: "luischi",
        state: "ACTIVO"
       },
      "keyExpr": 1
    }


    mockedDialogService.addDialog
      .mockImplementation(() =>
        of({
          confirm: true
        })
      )

    mockedCelulaService.updateCelulaById
      .mockImplementation(() => Promise.resolve({}))

    component.onDeleteStart(dataModal)

    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      mockedCelulaService.updateCelulaById
    ).toBeCalled()
  });

  it('should call the messageBar service', () => {
    const message: any = {
      status: "error",
      text: "ERROR"
    }
    const  spyMessage =  jest.spyOn(mockedMessageService, 'showMessage')
    component.setupMessageBar(message)
    expect(spyMessage).toBeCalled()
  });

});
