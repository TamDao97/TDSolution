import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { validateEmail } from '../../../utils/helpers';

@Component({
  selector: 'app-td-input',
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
  @Input() type!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() wrapClass!: string;
  @Input() inputClass: string = 'form-control';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() validators: Validators[] = []; // Nhận các validator từ ngoài

  //validator
  @Input() minLength: number = 3;
  @Input() maxLength: number = 255;

  value: any = '';
  isDisabled: boolean = false;
  errors: ValidationErrors | null = null;

  onChange = (value: any) => {};

  onTouched = () => {
    console.log(10000);
  };

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (!this.value) {
      errors['required'] = true;
    }

    if (this.value && this.value.length < this.minLength) {
      errors['minlength'] = {
        requiredLength: this.minLength,
        actualLength: this.value.length,
      };
    }

    if (this.value && this.value.length > this.maxLength) {
      errors['maxlength'] = {
        requiredLength: this.maxLength,
        actualLength: this.value.length,
      };
    }

    if (this.type === 'email' && this.value && !validateEmail(this.value)) {
      errors['email'] = true;
    }

    this.errors = Object.keys(errors).length ? errors : null;
    return this.errors;
  }
}
