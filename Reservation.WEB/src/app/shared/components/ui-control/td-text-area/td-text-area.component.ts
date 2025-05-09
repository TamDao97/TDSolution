import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { validateEmail } from '../../../utils/helpers';

@Component({
  selector: 'td-text-area',
  templateUrl: './td-text-area.component.html',
  styleUrls: ['./td-text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdTextAreaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TdTextAreaComponent),
      multi: true,
    },
  ],
})
export class TdTextAreaComponent implements ControlValueAccessor, Validator {
  @Input() type!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() wrapClass!: string;
  @Input() inputClass: string = 'form-control';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  //validator
  @Input() minLength: number = 3;
  @Input() maxLength: number = 255;

  control: FormControl = new FormControl(null);

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

    // Kiểm tra độ dài tối thiểu
    if (value && value.length < this.minLength) {
      errors['minlength'] = {
        requiredLength: this.minLength,
        actualLength: value.length,
      };
    }

    // Kiểm tra độ dài tối đa
    if (value && value.length > this.maxLength) {
      errors['maxlength'] = {
        requiredLength: this.maxLength,
        actualLength: value.length,
      };
    }

    // Kiểm tra email nếu input là dạng email
    if (this.type === 'email' && value && !validateEmail(value)) {
      errors['email'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}
