import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/system/login.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ToastService } from '../../../../shared/services/toast.service';
import { StatusResponseTitle } from '../../../../shared/utils/constants';
import { StatusCode } from '../../../../shared/utils/enums';
import { TdBaseComponent } from '../../../../shared/utils/extends-components/td-base.component';
import { AuthService } from '../../../../shared/utils/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class LoginComponent extends TdBaseComponent implements OnInit {
  frmGroup!: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _loginService: LoginService
  ) {
    super();
  }

  ngOnInit() {
    this.frmGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Kiểm tra xem form có hợp lệ không
    if (!this.validateForm(this.frmGroup)) return;

    let payload = this.frmGroup.value;
    this._loginService.login(payload).subscribe((rs) => {
      if (rs.status == StatusCode.Ok) {
        AuthService.setAuthStorage(rs.data);
        this._router.navigate(['/user']); // Điều hướng sau khi đăng nhập thành công
        this._toastService.success(StatusResponseTitle.SUCCESS, rs.message);
      } else {
        this._toastService.error(StatusResponseTitle.ERROR, rs.message);
      }
    });
  }
}
