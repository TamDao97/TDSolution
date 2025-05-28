import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { TdBaseComponent } from '../../shared/utils/extends-components/td-base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends TdBaseComponent implements OnInit {
  constructor(private _userService: UserService) {
    super();
  }

  ngOnInit() {}
}
