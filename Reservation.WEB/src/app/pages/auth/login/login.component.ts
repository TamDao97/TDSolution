import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class LoginComponent implements OnInit {
  frmGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.frmGroup = this.fb.group({
      email: ['', Validators.required],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.frmGroup.value);
  }
}
