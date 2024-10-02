import { Component, OnInit } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends TdBaseGridComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
