import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { UiControlModule } from '../../modules/ui-control.module';

@Component({
  selector: 'app-ui-control',
  templateUrl: './ui-control.component.html',
  styleUrls: ['./ui-control.component.css'],
  standalone: true,
  imports: [SharedModule, UiControlModule],
})
export class UiControlComponent implements OnInit {
  form = this.fb.group({
    inputVal: [null],
    selectVal: [null],
    selectMultiVal: [null],
    selectGroupVal: [null],
    noteVal: [null],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit(): void {
    console.log(this.form.value);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
