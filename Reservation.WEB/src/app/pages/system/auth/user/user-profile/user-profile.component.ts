import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { TdBaseComponent } from '../../../../../shared/utils/extends-components/td-base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { IResponse } from '../../../../../interfaces/IResponse';
import { UserService } from '../../../../../services/system/user.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { StatusResponseTitle, StatusResponseMessage } from '../../../../../shared/utils/constants';
import { StatusCode } from '../../../../../shared/utils/enums';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class UserProfileComponent extends TdBaseComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);

  frmGroup!: FormGroup;
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
    this.frmGroup = this._fb.group({
      id: [null],
      userName: [{ value: null, disabled: true }, [Validators.required]],
      displayName: [null, [Validators.required]],
      gender: [0, [Validators.required]],
      email: [null],
      phoneNumber: [null],
      isAdmin: [false],
    });
    if (this.params?.params?.id) {
      this._userService
        .getUserProfile()
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmGroup.patchValue(rs.data);
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
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
      .update(payload)
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
