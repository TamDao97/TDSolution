import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UiControlModule } from '../../../shared/modules/ui-control.module';
import { TdBaseComponent } from '../../../shared/utils/td-base.component';
import { LoginService } from '../../../services/auth/login.service';
import { StatusCode } from '../../../shared/utils/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule, UiControlModule],
})
export class LoginComponent extends TdBaseComponent implements OnInit {
  frmGroup!: FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService) {
    super();
  }

  ngOnInit() {
    this.frmGroup = this._fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Kiểm tra xem form có hợp lệ không
    if (!this.validateForm(this.frmGroup)) return;

    let payload = this.frmGroup.value;
    this._loginService.login(payload).subscribe((rs) => {
      if (rs.status == StatusCode.Ok) {
        console.log(rs.data);
      } else {
        console.log(rs.message);
      }
    });
  }
}
