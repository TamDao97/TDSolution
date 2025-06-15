import { Component, OnInit } from '@angular/core';
import { ICurrentUser } from '../../../interfaces/ICurrentUser';
import { AuthService } from '../../../utils/services/auth.service';
import { UserEditComponent } from '../../../../pages/system/auth/user/user-edit/user-edit.component';
import { TdBaseComponent } from '../../../utils/extends-components/td-base.component';
import { UserProfileComponent } from '../../../../pages/system/auth/user/user-profile/user-profile.component';
import { UserChangePasswordComponent } from '../../../../pages/system/auth/user/user-change-password/user-change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent extends TdBaseComponent implements OnInit {
  currentUser: ICurrentUser;

  constructor() {
    super();
  }

  ngOnInit() {
    const auth = AuthService.getAuthStorage(); // Lấy token từ localStorage
    if (auth) {
      this.currentUser = JSON.parse(auth) as ICurrentUser;
    }
  }

  onEditProfile() {
    this.openModal(
      {
        title: 'Cập nhật thông tin cá nhân',
        width: 800,
      },
      UserProfileComponent,
      {
        params: { id: this.currentUser.id },
      }
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }

  onChangePassword() {
    this.openModal(
      {
        title: 'Đổi mật khẩu',
        width: 800,
      },
      UserChangePasswordComponent
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }
}
