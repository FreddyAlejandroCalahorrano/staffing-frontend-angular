import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ConfirmModalDateComponent} from './confirm-modal-date.component';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {AsignacionesCelulasService} from "@services/asignaciones-celulas.service";

describe('ConfirmModalDateComponent', () => {
  let component: ConfirmModalDateComponent;
  let fixture: ComponentFixture<ConfirmModalDateComponent>;
  let MockedAsignacionesCelulasService = {
    getListExit : jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BootstrapModalModule,
      ],
      declarations: [ConfirmModalDateComponent],
      providers: [
        {provide: AsignacionesCelulasService, useValue: MockedAsignacionesCelulasService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the assigned date', () => {
    component.possibleCloseDate = '2100-10-10'
    component.ngOnInit()
    expect(component.assignmentEndDate.value).toEqual('2100-10-10')
  });

  it('should call the function to close the modal and the "assignmentEndDate" field should be valid', () => {
    component.setResult(true)
    expect(component.assignmentEndDate.valid).toBeTruthy()
  })
});
