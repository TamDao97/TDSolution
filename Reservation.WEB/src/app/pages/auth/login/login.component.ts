import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UiControlModule } from '../../../shared/modules/ui-control.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule, UiControlModule],
})
export class LoginComponent implements OnInit {
  frmGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.frmGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    // Đánh dấu tất cả các điều khiển là đã được chạm (touched)
    this.frmGroup.markAllAsTouched();

    // Cập nhật giá trị và trạng thái của tất cả các điều khiển
    this.frmGroup.updateValueAndValidity();

    // Kiểm tra xem form có hợp lệ không
    if (this.frmGroup.valid) {
      console.log(this.frmGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
