import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'td-radio',
  templateUrl: './td-radio.component.html',
  styleUrls: ['./td-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdRadioComponent),
      multi: true,
    },
  ],
})
export class TdRadioComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() wrapClass!: string;
  // @Input() selectClass: string = 'form-select';
  @Input() selectClass: string = '';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  value: any = '';
  isDisabled: boolean = false;
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2', disabled: true },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
    { value: 'This is value 5', label: 'Option 5' },
  ];

  onChange = (value: any) => {};
  onTouched = () => {};

  // onBlur(): void {
  //   this.onTouched();
  // }

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

  bind(e: any): void {
    this.value = e;
    this.onChange(this.value);
    this.onTouched();
  }
}
