import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { RoleService } from '../../../../services/system/role.service';
import { TdBaseComponent } from '../../../../shared/utils/extends-components/td-base.component';
import { IResponse } from '../../../../interfaces/IResponse';
import { StatusResponseTitle, StatusResponseMessage } from '../../../../shared/utils/constants';
import { StatusCode } from '../../../../shared/utils/enums';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RoleEditComponent extends TdBaseComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);
  isDisabled: boolean = false;

  frmGroup!: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _roleService: RoleService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.frmGroup = this._fb.group({
      id: [null],
      code: [null, [Validators.required]],
      name: [0, [Validators.required]],
      description: [null],
      order: [null],
    });

    if (this.params?.params?.id) {
      this._roleService
        .getById(this.params?.params?.id)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmGroup.patchValue(rs.data);
            if (this.params.isDisabled) {
              this.frmGroup.disable();
            } else {
              this.frmGroup.enable();
            }
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
  }

  onSave() {
    const isValid = this.validateForm(this.frmGroup);

    if (!this.frmGroup.get('id')?.value) {
      if (!isValid) {
        this._toastService.warning(StatusResponseTitle.WARNING, StatusResponseMessage.INPUT_REQUIRED);
        return;
      }
      const payload = {
        ...this.frmGroup.value
      }
      this._roleService
        .create(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmGroup.reset();
            this.closeModal();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.ADD_SUCCESS)
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    } else {
      const payload = {
        ...this.frmGroup.value
      }
      this._roleService
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
  }

  onClose() {
    this.closeModal();
  }
}
