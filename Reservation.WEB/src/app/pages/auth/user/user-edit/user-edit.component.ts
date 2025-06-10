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
  params: any = inject(NZ_MODAL_DATA)?.params;

  frmAccountGroup!: FormGroup;
  frmUserInfoGroup!: FormGroup;


  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.frmAccountGroup = this._fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.frmUserInfoGroup = this._fb.group({
      id: [null],
      displayName: [null, [Validators.required]],
      gender: [0, [Validators.required]],
      email: [null],
      phoneNumber: [null],
      isAdmin: [false],
    });

    if (this.params?.data?.id) {
      this._userService
        .getById(this.params?.data?.id)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmUserInfoGroup.patchValue(rs.data);
            if (this.params.isDisabled) {
              this.frmUserInfoGroup.disable();
            } else {
              this.frmUserInfoGroup.enable();
            }
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
  }

  onSave() {
    const isAccountValid = this.validateForm(this.frmAccountGroup);
    const isUserInfoValid = this.validateForm(this.frmUserInfoGroup);

    if (!this.frmUserInfoGroup.get('id')?.value) {
      if (!(isAccountValid && isUserInfoValid)) {
        this._toastService.warning(StatusResponseTitle.WARNING, StatusResponseMessage.INPUT_REQUIRED);
        return;
      }
      const payload = {
        ...this.frmAccountGroup.value,
        ...this.frmUserInfoGroup.value
      }
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
      const payload = {
        ...this.frmUserInfoGroup.value
      }
      this._userService
        .update(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmUserInfoGroup.reset();
            this.closeModal();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.UPDATE_SUCCESS);
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
  }

  onClose() {
    this.closeModal();
  }
}
