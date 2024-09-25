import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'td-auto-complete',
  templateUrl: './td-auto-complete.component.html',
  styleUrls: ['./td-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdAutoCompleteComponent),
      multi: true,
    },
  ],
})
export class TdAutoCompleteComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  inputValue: string = '';
  filteredOptions: string[] = [];
  searchTerms = new Subject<string>();
  page = 1; // Biến để kiểm soát phân trang
  isLoading = false; // Trạng thái loading

  constructor(private el: ElementRef) {}

  onChange = (value: any) => {};
  onTouch = () => {};

  ngOnInit(): void {
    // Gọi API khi người dùng nhập giá trị mới
    this.searchTerms
      .pipe(
        debounceTime(300),
        switchMap((term) => this.loadOptions(term))
      )
      .subscribe((options) => {
        this.filteredOptions = options;
      });
  }

  // Gọi service để lấy dữ liệu với lazy load
  loadOptions(searchTerm: string, page = 1): Observable<string[]> {
    this.isLoading = true;
    return this.getDataPagging(searchTerm, page).pipe(
      // Khi hoàn thành tải, kết hợp dữ liệu
      tap(() => (this.isLoading = false)),
      map((newOptions) =>
        page === 1 ? newOptions : [...this.filteredOptions, ...newOptions]
      )
    );
  }

  // Khi người dùng nhập vào input
  onInputChange(value: string): void {
    this.page = 1; // Reset lại trang khi có dữ liệu mới
    this.inputValue = value;
    this.onChange(this.inputValue);
    this.onTouch();
    this.searchTerms.next(value); // Phát giá trị tìm kiếm mới
  }

  writeValue(value: any): void {
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Cập nhật trạng thái disabled nếu cần
  }

  selectOption(option: string) {
    this.inputValue = option;
    this.onChange(this.inputValue);
    this.filteredOptions = [];
  }

  // Theo dõi sự kiện scroll để thực hiện lazy load
  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const element = event.target;

    // Kiểm tra nếu cuộn gần tới cuối danh sách (90%)
    if (
      element.scrollHeight - element.scrollTop <= element.clientHeight * 1.1 &&
      !this.isLoading
    ) {
      this.page++;
      this.loadOptions(this.inputValue, this.page);
    }
  }

  //Service để load dữ liệu
  // Giả sử gọi API để lấy dữ liệu theo trang
  getDataPagging(searchTerm: string, page: number = 1): Observable<string[]> {
    const allOptions = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
    ];
    const pageSize = 3;
    const filtered = allOptions
      .filter((option) =>
        option.toLowerCase().includes(searchTerm?.toLowerCase())
      )
      .slice((page - 1) * pageSize, page * pageSize); // Phân trang kết quả

    return of(filtered).pipe(delay(500)); // Thêm độ trễ 0.5s để mô phỏng API gọi thực tế
  }
}
