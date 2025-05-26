import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UiFormModule } from '../../../shared/modules/ui-form.module';
import { AuthService } from '../../../api-request/auth.service';
import { IResponse } from '../../../interfaces/IResponse';
import { StatusCode } from '../../../shared/utils/enums.enum';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { StatusResponseTitle } from '../../../shared/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule, UiFormModule],
})
export class LoginComponent implements OnInit {
  frmGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _toastService: ToastService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.frmGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (!this.frmGroup.valid) {
      this.frmGroup.markAllAsTouched(); // Đánh dấu tất cả các điều khiển là đã được chạm (touched)
      this.frmGroup.updateValueAndValidity(); // Cập nhật giá trị và trạng thái của tất cả các điều khiển
      // this._toastService.error(
      //   StatusResponseTitle.ERROR,
      //   'Vui lòng nhập dữ liệu bắt buộc!'
      // );
      return;
    }

    let body = this.frmGroup.value;
    this._authService.login(body).subscribe(
      (response: IResponse) => {
        if (response.status == StatusCode.Ok) {
          this._router.navigate(['/dashboard']);
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, response.message);
        }
      },
      (error) => {
        this._toastService.error('Lỗi', error);
      }
    );
  }
}
