import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, Validators,} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {CustomInputComponent} from './custom-input.component';

class MockedNgControl extends NgControl {
  viewToModelUpdate(newValue: any): void {
    throw new Error('Method not implemented.');
  }

  get control(): AbstractControl | null {
    const control = new FormControl();
    control.setValidators([Validators.required]);
    control.setErrors({invalid: true});
    control.markAsTouched();
    control.markAsDirty();
    return control;
  }
}

xdescribe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;
  let ngControl: NgControl;

  beforeEach(async () => {
    ngControl = new MockedNgControl();

    await TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{provide: NgControl, useValue: ngControl}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    component.id = 'id';
    component.showMaxLength = true;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inputValue get form control value', () => {
    const value = component.inputValue;
    expect(value).toEqual(null);
  });

  it('should hasErrors get if form control has errors', async () => {
    const value = component.hasErrors;
    expect(value).toEqual(true);
  });

  it('should hasErrors get if form control has errors', async () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#id')
    ).nativeElement;

    inputElement.dispatchEvent(new InputEvent('45'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const value = component.hasErrors;
      expect(value).toEqual(true);
    });
  });
});
