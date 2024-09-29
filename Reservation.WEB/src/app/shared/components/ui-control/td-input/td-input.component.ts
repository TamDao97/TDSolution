import { Component, forwardRef, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { validateEmail } from '../../../utils/helpers';

@Component({
  selector: 'td-input',
  templateUrl: './td-input.component.html',
  styleUrls: ['./td-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TdInputComponent),
      multi: true,
    },
  ],
})
export class TdInputComponent implements ControlValueAccessor, Validator {
  @Input() type: string = 'text';
  @Input() label!: string;
  @Input() placeholder: string = '';
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

  // onInput(event: Event): void {
  //   const input = (event.target as HTMLInputElement).value;
  //   this.control.setValue(input); // Cập nhật giá trị vào form control
  //   this.onChange(input);
  //   this.onTouched();
  // }

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
