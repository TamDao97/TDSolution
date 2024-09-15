import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UiControlModule } from '../../modules/ui-control.module';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-ui-control',
  templateUrl: './ui-control.component.html',
  styleUrls: ['./ui-control.component.css'],
  imports: [SharedModule, UiControlModule],
  standalone: true,
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
}
