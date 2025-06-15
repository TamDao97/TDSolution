import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

export function confirmPassword(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null; // tránh lỗi khi chưa khởi tạo
    const password = control.parent.get(passwordControlName)?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}