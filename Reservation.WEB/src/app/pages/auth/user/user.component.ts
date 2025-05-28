import { Component, OnInit, ViewChild } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { IControl } from '../../../shared/interfaces/IControl';
import { ControlTypeEnum } from '../../../shared/utils/enums';
import { TdBaseService } from '../../../shared/utils/services/td-base.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserComponent extends TdBaseGridComponent implements OnInit {
  override title = 'Quản lý người dùng';
  isCollapsed = false;

  constructor(_tdBaseService: TdBaseService) {
    super(_tdBaseService);
  }

  override ngOnInit(): void {}

  /************Khai báo form filter**************/

  filterControl: IControl[] = [
    {
      label: 'Quyền',
      type: ControlTypeEnum.Select,
      colClass: 'col-4',
      ngModel: 'role',
      placeHolder: '--Chọn--',
      order: 1,
    },
    {
      label: 'Trạng thái',
      type: ControlTypeEnum.Select,
      colClass: 'col-4',
      ngModel: 'status',
      placeHolder: '--Chọn--',
      order: 1,
    },
    {
      label: 'Giới tính',
      type: ControlTypeEnum.Radio,
      colClass: 'col-4',
      ngModel: 'gender',
      order: 1,
    },
    {
      label: 'Loại tài khoản',
      type: ControlTypeEnum.Select,
      colClass: 'col-4',
      ngModel: 'accountType',
      placeHolder: '--Chọn--',
      order: 1,
    },
  ];

  onSearchAdvance(): void {
    // this._filterGridService.open(this.filterControl);
  }

  // Các hàm xử lý action
  onViewClick(data: any) {
    console.log('Xem', data);
  }

  onEditClick(data: any) {
    console.log('Sửa', data);
  }

  onDeleteClick(data: any) {
    console.log('Xóa', data);
  }
}
