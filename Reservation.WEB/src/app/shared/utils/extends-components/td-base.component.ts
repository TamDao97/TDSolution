import { inject, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

export class TdBaseComponent {
  protected _modal = inject(NzModalService); // inject không cần constructor
  constructor() {}

  /**
   * Validate form
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

  /**
   * Open modal
   * @param options
   * @param component
   * @param params
   * @returns
   */
  openModal<T>(options: any, component: Type<T>, params: Partial<T> = {}) {
    return this._modal.create({
      nzTitle: options.title,
      nzContent: component,
      nzData: params,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: options.width,
      nzFooter: null, // hoặc bạn có thể custom footer
      nzStyle: {
        zIndex: 2000, // cao hơn sidebar
      },
    });
  }
}
