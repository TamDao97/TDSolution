import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form = new FormGroup({
    inputVal: new FormControl(''),
    selectVal: new FormControl(''),
    noteVal: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit(): void {
    console.log(this.form.value);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
