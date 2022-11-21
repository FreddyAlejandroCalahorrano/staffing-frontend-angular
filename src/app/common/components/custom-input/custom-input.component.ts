import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

export type SIZE = 'extra-small' | 'small' | 'medium' | 'large' | 'medium textUper'
export type STATE = 'normal' | 'disabled' | 'success' | 'error'


@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})


export class CustomInputComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() showLabel: boolean = true;
  @Input() type: string = 'text';
  @Input() styleClass: string = '';
  @Input() placeholder: string = 'Escribe un texto';
  @Input() id: string = '';
  @Input() size: SIZE = 'medium';
  @Input() state: STATE = 'normal';
  @Input() textUP: boolean = false;
  @Input() fullWidth: boolean = true;
  @Input() normalHelper: string = '';
  @Input() errorHelper: string = '';
  @Input() maxLength!: number;
  @Input() showMaxLength: boolean = false;
  @Input() showIconStatus: boolean = true;
  @Input() pattern: string = '';
  @Input() name: string = '';
  @Input() value!: any;
  @Input() currencyField: boolean = false;
  @Input() percentageField: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() autocomplete: 'on' | 'off' = 'off';
  @Input() filterRegex: string
  @Input() showSearchButton: boolean = false
  @Output() clickButton: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private control: NgControl) {
  }

  ngOnInit(): void {
  }

  handleEvent(event: any) {
    const regex = new RegExp(this.filterRegex);
    if (this.filterRegex && regex.test(String.fromCharCode(event.keyCode))) {
      event.preventDefault();
    }
  }

  get formControl() {
    return this.control.control! as FormControl;
  }

  get hasErrors() {
    return this.formControl.touched && this.formControl.invalid;
  }

  get inputValue() {
    return this.formControl.value;
  }

  handleClick() {
    this.clickButton.emit(true)
  }

}
