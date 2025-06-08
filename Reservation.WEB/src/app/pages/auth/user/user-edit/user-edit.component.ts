import { Component, inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { TdBaseComponent } from '../../../../shared/utils/extends-components/td-base.component';
import { UserService } from '../../../../services/user/user.service';
import { StatusResponseMessage, StatusResponseTitle } from '../../../../shared/utils/constants';
import { IResponse } from '../../../../interfaces/IResponse';
import { StatusCode } from '../../../../shared/utils/enums';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class UserEditComponent extends TdBaseComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);

  frmAccountGroup!: FormGroup;
  frmUserInfoGroup!: FormGroup;

  private _modalRef = inject(NzModalRef);
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.params);
    this.frmAccountGroup = this._fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.frmUserInfoGroup = this._fb.group({
      id: [this.params?.params?.id ?? null],
      displayName: [null, [Validators.required]],
      gender: [0, [Validators.required]],
      email: [null],
      phoneNumber: [null],
      isAdmin: [null],
    });
  }

  onSave() {
    const isAccountValid = this.validateForm(this.frmAccountGroup);
    const isUserInfoValid = this.validateForm(this.frmUserInfoGroup);
    if (!(isAccountValid && isUserInfoValid)) {
      this._toastService.warning(StatusResponseTitle.WARNING, StatusResponseMessage.INPUT_REQUIRED);
      return;
    }

    const payload = {
      ...this.frmAccountGroup.value,
      ...this.frmUserInfoGroup.value
    }
    if (!payload.id) {
      this._userService
        .create(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmAccountGroup.reset();
            this.frmUserInfoGroup.reset();
            this.closeModal();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.ADD_SUCCESS)
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    } else {
      this._userService
        .update(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmAccountGroup.reset();
            this.frmUserInfoGroup.reset();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.UPDATE_SUCCESS);
            this.closeModal();
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
  }

  /**
 * Close modal
 * @param data
 */
  closeModal(data?: any) {
    this._modalRef.close(data);
  }
}
