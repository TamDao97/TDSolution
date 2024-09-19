import { Component, forwardRef, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'td-select-group',
  templateUrl: './td-select-group.component.html',
  styleUrls: ['./td-select-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdSelectGroupComponent),
      multi: true,
    },
  ],
})
export class TdSelectGroupComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder: string = '--Chọn--';
  @Input() wrapClass!: string;
  // @Input() selectClass: string = 'form-select';
  @Input() selectClass: string = '';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() validators: Validators[] = []; // Nhận các validator từ ngoài

  //validator
  value: any = '';
  isDisabled: boolean = false;
  errors: ValidationErrors | null = null;
  isShowError: boolean = false;

  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  onChange: any = () => {};
  onTouched: any = () => {};

  // Xử lý khi người dùng chọn một giá trị
  onSelectChange(e: any) {
    const newValue = e;
    console.log('onChange được gọi với giá trị:', newValue);
    // Gọi hàm callback đã đăng ký
    this.onChange(newValue);
  }

  // Xử lý sự kiện touch (blur)
  onBlur() {
    this.onTouched();
  }

  // Ghi lại giá trị vào form control
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Có thể thêm xử lý khi cần disabled select
  }
}
