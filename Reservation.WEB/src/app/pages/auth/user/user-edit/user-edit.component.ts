import { Component, inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class UserEditComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);

  frmAccountGroup!: FormGroup;
  frmUserInfoGroup!: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    console.log(this.params);
    alert(this.params.params.id);

    this.frmAccountGroup = this._fb.group({
      id: [this.params.params.id ?? null],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.frmUserInfoGroup = this._fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      // idRole: [null, [Validators.required]],
    });
  }
}
