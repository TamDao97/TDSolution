import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { IDropdown } from '../../../../interfaces/IDropdown';
import { environment } from '../../../../../env.development';
import { IResponse } from '../../../../interfaces/IResponse';

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
  @Input() label?: string;
  @Input() placeholder?: string = '--Chọn--';
  @Input() wrapClass!: string;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  items: IDropdown[] = [];
  loading = false;
  page = 1;
  pageSize = 20;
  control: FormControl = new FormControl(null);

  subject$ = new BehaviorSubject<IDropdown[]>([]);
  githubUsers$ = this.subject$.asObservable();
  apiUrl = environment.apiUrl + '/user/fake-data';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMoreDatas();
  }

  fetchDatas(page: number, pageSize: number): Observable<IDropdown[]> {
    const payload = {
      pageNumber: page,
      pageSize: pageSize,
    };

    return this.http.post<IResponse>(this.apiUrl, payload).pipe(
      map((res: IResponse) =>
        res.data.map((item: IDropdown) => ({
          value: item.value,
          text: item.text,
        }))
      ),
      tap(() => (this.loading = false)),
      catchError((err) => {
        console.error('Error loading data', err);
        // Thông báo lỗi cho người dùng (nếu cần)
        alert('Đã có lỗi xảy ra khi tải dữ liệu');
        return of([]); // Trả về mảng trống nếu có lỗi
      }),
      finalize(() => {
        this.loading = false; // Đảm bảo luôn tắt loading
      })
    );
  }

  loadMoreDatas() {
    this.loading = true;
    this.fetchDatas(this.page, this.pageSize).subscribe((datas) => {
      this.items = [...this.items, ...datas];
      this.subject$.next(this.items);
      setTimeout(() => {
        this.loading = false;
      }, 100); // Đợi 100ms trước khi set lại loading
    });
  }

  onScrollToEnd() {
    if (!this.loading) {
      this.page++;
      this.loadMoreDatas();
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
