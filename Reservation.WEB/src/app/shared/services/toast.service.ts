import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _notification: NzNotificationService) {}

  success(title: string, content: string) {
    this._notification.create('success', title, content, {
      nzPlacement: 'topRight',
      nzDuration: 3000,
    });
  }

  error(title: string, content: string) {
    this._notification.create('error', title, content, {
      nzPlacement: 'topRight',
      nzDuration: 3000,
    });
  }

  // thêm các method info, warning, v.v nếu cần
}
