import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'td-checkbox',
  templateUrl: './td-checkbox.component.html',
  styleUrls: ['./td-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdCheckboxComponent),
      multi: true,
    },
  ],
})
export class TdCheckboxComponent implements ControlValueAccessor {
  @Input() status!: string;
  @Input() label!: string;

  value: any = '';
  isDisabled: boolean = false;

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

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  bind(e: any): void {
    this.value = e;
    this.onChange(this.value);
    this.onTouched();
  }
}
