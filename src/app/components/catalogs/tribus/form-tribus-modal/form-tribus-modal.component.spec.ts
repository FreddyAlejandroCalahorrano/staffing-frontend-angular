import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CustomCommonModule} from '../../../../common/components/common.module';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {TribuService, UtilitaryService,} from '@services/index';
import {FormTribusModalComponent} from "./form-tribus-modal.component";

describe('FormTribusModalComponent', () => {
  let component: FormTribusModalComponent;
  let fixture: ComponentFixture<FormTribusModalComponent>;

  let mockTribuService = {
    updateTribu: jest.fn(),
    addTribu: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        CustomCommonModule,
      ],
      declarations: [FormTribusModalComponent],
      providers: [
        UtilitaryService,
        {provide: TribuService, useValue: mockTribuService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTribusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the [addTribu] method if the editForm variable is false', () => {
    const spy = jest.spyOn(mockTribuService, 'addTribu')
      .mockImplementation(() => Promise.resolve())
    component.onSubmit()
    expect(spy).toBeCalled()
  })

  it('should call the [updateTribu] method if the editForm variable is true', () => {
    component.data = {
      id: 0,
      tribuName: '',
      description: '',
      tribuCreationDate: '',
      user: '',
      state: '',
    }
    component.editForm = true
    const spy = jest.spyOn(mockTribuService, 'updateTribu')
      .mockImplementation(() => Promise.resolve())
    component.onSubmit()
    expect(spy).toBeCalled()
  })

  it('should call the [patchValue] method of the reactiveForm when there is data', () => {

    component.data = {
      id: 0,
      tribuName: '',
      user: '',
      state: '',
      description: '',
      tribuCreationDate: '',
      tribuFinishDate: '',
    }

    const spyPatchValue = jest.spyOn(component.tribusFormGroup, 'patchValue')

    component.setData()

    expect(
      component.editForm
    ).toBeTruthy()

    expect(
      spyPatchValue
    ).toHaveBeenCalled()

  });

  it('should call the [add Tribu] method if it returns an error', () => {
    const spy = jest.spyOn(mockTribuService, 'addTribu')
      .mockImplementation(() => Promise.reject({response: ''}))
    component.onSubmit()
    expect(spy).toBeCalled()
  });

  it('should keep the state of the control "tribuName" valid', () => {
    component.data = {
      "id": 2,
      "tribuName": "BUSINESS CAPABILITIES",
      "tribuCreationDate": "2021-11-16",
      "tribuFinishDate": null,
      "description": "BUSINESS CAPABILITIES xd",
      "user": "jariastu",
      "state": "ACTIVO"
    }
    component.tribuName.patchValue('BUSINESS CAPABILITIES')
    expect(component.tribuName.valid).toBeTruthy()
  })

});
