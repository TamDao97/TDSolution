import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StatusCode, ToastStatus } from '../../shared/utils/enums';
import { TdBaseComponent } from '../../shared/utils/td-base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends TdBaseComponent implements OnInit {
  constructor(private _userService: UserService) {
    super();
  }

  ngOnInit() {
    this.getById('82092b61-f914-4cc6-a2d2-504a96c77589');
  }

  getById(id: string): void {
    this._userService.getById(id).subscribe((rs) => {
      if (rs.status == StatusCode.Ok) {
        console.log(rs.data);
        this.toast(ToastStatus.Success, rs.message);
      } else {
        this.toast(ToastStatus.Error, rs.message);
      }
    });
  }
}
