import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'td-date-picker',
  templateUrl: './td-date-picker.component.html',
  styleUrls: ['./td-date-picker.component.scss'],
})
export class TdDatePickerComponent implements ControlValueAccessor, Validator {
  @Input() type: string = 'text';
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() wrapClass: string = '';
  @Input() inputClass: string = 'form-control';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  // @Input() validators: any[] = []; // Nhận các validator từ ngoài

  @Input() minLength: number = 3;
  @Input() maxLength: number = 255;

  control: FormControl = new FormControl(null);

  constructor() {}

  onChange = (value: any) => {};
  onTouched = () => {};

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control as FormControl;
    const errors: ValidationErrors = {};
    const value = this.control.value;

    // Kiểm tra validator required
    if (!value) {
      errors['required'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}
