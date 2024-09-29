import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { IDropdown } from '../../../../interfaces/IDropdown';

@Component({
  selector: 'td-select',
  templateUrl: './td-select.component.html',
  styleUrls: ['./td-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdSelectComponent),
      multi: true,
    },
  ],
})
export class TdSelectComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder: string = '--Chọn--';
  @Input() wrapClass!: string;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  //validator
  control: FormControl = new FormControl(null);
  isDisabled: boolean = false;

  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  githubUsers$: Observable<IDropdown[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.githubUsers$ = this.getGithubAccounts('anjm');
  }

  getGithubAccounts(term = '') {
    if (term) {
      return this.http
        .get<any>(`https://api.github.com/search/users?q=${term}`)
        .pipe(map((rsp) => rsp.items));
    } else {
      return of([]);
    }
  }

  trackByLogin(index: number, item: any): string {
    return item.login;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  // Xử lý khi người dùng chọn một giá trị
  onSelectChange(e: any) {
    this.onChange(e);
  }

  // Xử lý sự kiện touch (blur)
  onBlur() {
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
    this.isDisabled = isDisabled;
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
