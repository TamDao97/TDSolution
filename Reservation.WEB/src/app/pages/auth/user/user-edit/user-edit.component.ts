import { Component, inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);
  constructor() {}

  ngOnInit() {
    console.log(this.params);
    alert(this.params.params.id);
  }
}
