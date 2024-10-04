import { Component, OnInit } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { TdBaseService } from '../../../shared/services/td-base.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends TdBaseGridComponent implements OnInit {
  constructor(_tdBaseService: TdBaseService) {
    super(_tdBaseService);
  }
}
