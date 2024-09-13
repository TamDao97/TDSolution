import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector: '[appRequired]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredDirective, multi: true },
  ],
})
export class RequiredDirective implements Validator {
  @Input('appRequired') required: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (this.required && !control.value) {
      return { required: true };
    }
    return null;
  }

  // Sử dụng sự kiện 'input' để lắng nghe mỗi khi giá trị input thay đổi
  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    // Kiểm tra nếu trường yêu cầu và không có giá trị thì hiển thị lỗi
    if (this.required && !target.value) {
      this.showError('Vui lòng nhập thông tin');
    } else {
      this.hideError();
    }
  }

  private showError(message: string) {
    let error = this.el.nativeElement.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
      error = this.renderer.createElement('div');
      this.renderer.addClass(error, 'error-message');
      this.renderer.appendChild(this.el.nativeElement.parentNode, error);
    }
    this.renderer.setProperty(error, 'textContent', message);
  }

  private hideError() {
    const error = this.el.nativeElement.nextElementSibling;
    console.log('Error element:', error); // Kiểm tra phần tử lỗi có đúng không
    if (error && error.classList.contains('error-message')) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, error);
    }
  }
}
