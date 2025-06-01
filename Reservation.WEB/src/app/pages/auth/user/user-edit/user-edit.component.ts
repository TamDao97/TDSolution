import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  params: {};
  constructor() {}

  ngOnInit() {
    console.log(this.params);
  }
}
