import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {FormCelulasModalComponent} from './form-celulas-modal.component';
import {CustomCommonModule} from '../../../../common/components/common.module';
import {CelulaService, TribuService, UtilitaryService} from '@services/index';
import {getToday} from "../../../../common/utils/fn";
import {DialogService} from "@modal/dialog.service";
import {global} from "@angular/compiler/src/util";


describe('FormCelulasModalComponent', () => {
  let component: FormCelulasModalComponent;
  let fixture: ComponentFixture<FormCelulasModalComponent>;
  let mockedCelulaService = {
    updateCelulaById: jest.fn(),
    addCelula: jest.fn()
  }
  let mockedDialogService = {
    result: jest.fn(),
    removeDialog: jest.fn()
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule
      ],
      declarations: [FormCelulasModalComponent],
      providers: [UtilitaryService, FormBuilder, TribuService,
        {provide: CelulaService, useValue: mockedCelulaService},
        {provide: DialogService, useValue: mockedDialogService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCelulasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should created form ', () => {
    let form = component.celulasFormGroup
    expect(form).toBeTruthy()
  });

  it('check initial form values for celas form group', () => {
    expect(component.celulaNameProduct.value).toEqual('');
    expect(component.celulaNameSquad?.value).toEqual('');
    expect(component.celulaCreationDate?.value).toEqual(getToday());
    expect(component.celulaFinishDate?.value).toEqual('')
    expect(component.description?.value).toEqual('')
    expect(component.idTribu?.value).toEqual('')
  });

  it('should call setTimeout', () => {
    jest.useFakeTimers();
    const spyTime = jest.spyOn(global, 'setTimeout')
    component.editData(true)
    expect(spyTime).toBeCalled()
  })

  it('should change the state of the form', () => {
    component.celulasFormGroup.patchValue({
      celulaNameSquad: "PEUBA",
      celulaNameProduct: "PRUEBA",
      celulaCreationDate: getToday(),
      celulaFinishDate: null,
      description: null,
      idTribu: 2,
      user: "luischi",
      state: "ACIVO",
    })
    fixture.detectChanges()
    const spy = jest.spyOn(mockedCelulaService, 'addCelula')
      .mockImplementation(() => Promise.resolve());
    component.onSubmit()
    expect(spy).toBeCalled()
  })

  it('should return the values with or without id depending on the case', () => {
    let submitCelula: any = {
      "celulaCreationDate": getToday(),
      "celulaFinishDate": null,
      "celulaNameProduct": "",
      "celulaNameSquad": "prueba",
      "description": null,
      "idTribu": "",
      "state": "ACTIVO",
      "user": "luischi"
    }
    component.celulasFormGroup.patchValue(submitCelula)
    component.celula = {
      id: 5,
      celulaNameSquad: "PRUEBA",
      celulaNameProduct: "PRUEBA",
      celulaCreationDate: getToday(),
      celulaFinishDate: "",
      description: "",
      idTribu: 2,
      tribuName: 'tribu',
      user: "luischi",
      state: "ACTIVO",
    }
    fixture.detectChanges()
    expect(
      component.getDataRequest(false).celulaNameSquad
    ).toEqual(submitCelula.celulaNameSquad.toUpperCase())
    expect(component.getDataRequest(true).id).toBeTruthy()
  });

  it('should change the state of the "isEdit" variable to true', () => {
    component.celula = {
      id: 5,
      celulaNameSquad: "PRUEBA",
      celulaNameProduct: "PRUEBA",
      celulaCreationDate: getToday(),
      celulaFinishDate: "",
      description: "",
      idTribu: 2,
      tribuName: 'tribu',
      user: "luischi",
      state: "ACTIVO",
    }
    component.ngOnInit()
    expect(component.isEdit).toBeTruthy()
  });

  it('the form should be in true invalid state', () => {
    component.celulasFormGroup.patchValue(undefined)
    component.onSubmit()
    expect(component.celulasFormGroup.invalid).toBeTruthy()
  });

  it('should call the method "addCelula" in error state', () => {
    component.celulasFormGroup.patchValue({
      celulaNameSquad: "PEUBA",
      celulaNameProduct: "PRUEBA",
      celulaCreationDate: getToday(),
      celulaFinishDate: null,
      description: null,
      idTribu: 2,
      user: "luischi",
      state: "ACIVO",
    })
    const spy = jest.spyOn(mockedCelulaService, 'addCelula')
      .mockImplementation(() => Promise.reject({response: ""}));
    component.onSubmit()
    expect(spy).toBeCalled()
  })

});
