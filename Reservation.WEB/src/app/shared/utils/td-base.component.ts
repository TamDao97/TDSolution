import { FormGroup } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { ToastStatus } from './enums';
import { inject } from '@angular/core';

export class TdBaseComponent {
  private _toastService: ToastService = inject(ToastService);

  constructor() {}

  /**
   *
   * @param frmGroup validate formGroup
   * @returns
   */
  validateForm(frmGroup: FormGroup): boolean {
    if (frmGroup.invalid) {
      frmGroup.markAllAsTouched();
      frmGroup.updateValueAndValidity();
      return false;
    } else return true;
  }

  toast(toastStatus: ToastStatus, mess: string): void {
    let header: string = 'Thành công';
    let bgClass: string = 'bg-success';
    if (toastStatus == ToastStatus.Success) {
      header = 'Thành công!';
      bgClass = 'bg-success';
    } else if (toastStatus == ToastStatus.Warning) {
      header = 'Cảnh báo!';
      bgClass = 'bg-warning';
    } else if (toastStatus == ToastStatus.Error) {
      header = 'Thất bại!';
      bgClass = 'bg-danger';
    }

    this._toastService.show(mess, {
      classname: `${bgClass} text-light`,
      header: header,
    });
  }
}
