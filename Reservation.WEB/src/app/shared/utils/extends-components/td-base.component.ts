import { inject, Type } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IModalOptions } from '../../interfaces/IBase';

export class TdBaseComponent {
  private _modal = inject(NzModalService); // inject không cần constructor
  private _modalRef = inject(NzModalRef, { optional: true }); // Tránh lỗi nếu không có provider

  constructor() { }

  /**
   * Validate form
   * @param frmGroup validate formGroup
   * @returns
   */
  validateForm(form: AbstractControl): boolean {
    if (form instanceof FormGroup || form instanceof FormArray) {
      Object.values(form.controls).forEach((control) => {
        this.validateForm(control); // Đệ quy cho control con
      });
    }
    form.markAsTouched({ onlySelf: true });
    form.markAsDirty({ onlySelf: true });
    form.updateValueAndValidity({ onlySelf: true });
    return form.valid;
  }

  /**
   * Open modal
   * @param options
   * @param component
   * @param params
   * @returns
   */
  openModal<T>(
    options: IModalOptions,
    component: Type<T>,
    params: Partial<T> = {}
  ) {
    return this._modal.create({
      nzTitle: options.title,
      nzContent: component,
      nzData: params,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: options.width,
      nzFooter: null, // hoặc bạn có thể custom footer
    });
  }

  /**
   * Close modal
   * @param data
   */
  closeModal(data?: any) {
    this._modalRef?.close(data);
  }

  /**
   * Confirm modal
   * @param message 
   * @param onOk 
   * @param title 
   */
  confirmModal(message: string, onOk: () => void, title: string = 'Xác nhận') {
    this._modal.confirm({
      nzTitle: title,
      nzContent: message,
      nzOkText: 'Đồng ý',
      nzCancelText: 'Huỷ',
      nzOkType: 'default',
      nzOnOk: onOk
    });
  }
}
