import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from '../../../../../interfaces/IResponse';
import { UserService } from '../../../../../services/system/user.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { StatusResponseTitle, StatusResponseMessage } from '../../../../../shared/utils/constants';
import { StatusCode } from '../../../../../shared/utils/enums';
import { TdBaseComponent } from '../../../../../shared/utils/extends-components/td-base.component';
import { confirmPassword } from '../../../../../shared/utils/helpers';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserChangePasswordComponent extends TdBaseComponent implements OnInit {
  frmGroup!: FormGroup;
  constructor(
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
    this.frmGroup = this._fb.group({
      id: [null],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required, confirmPassword('password')]],
    });
  }

  onSave() {
    const isValid = this.validateForm(this.frmGroup);
    if (!isValid) {
      this._toastService.warning(StatusResponseTitle.WARNING, StatusResponseMessage.INPUT_REQUIRED);
      return;
    }
    const payload = {
      ...this.frmGroup.value
    }
    this._userService
      .changePassword(payload)
      .subscribe((rs: IResponse) => {
        if (rs.status == StatusCode.Ok) {
          this.frmGroup.reset();
          this.closeModal();
          this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.UPDATE_SUCCESS);
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      });
  }

  onClose() {
    this.closeModal();
  }
}
