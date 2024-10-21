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
  @Input() label?: string;
  @Input() wrapClass!: string;
  @Input() name: string = '';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() options: any[] = [];

  value: any = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  // Handle radio change
  onRadioChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
