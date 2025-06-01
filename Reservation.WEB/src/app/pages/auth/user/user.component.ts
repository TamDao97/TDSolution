import { Component, OnInit, ViewChild } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { IControl } from '../../../shared/interfaces/IControl';
import { ControlTypeEnum } from '../../../shared/utils/enums';
import { TdBaseService } from '../../../shared/utils/services/td-base.service';
import { ToastService } from '../../../shared/services/toast.service';
import { StatusResponseTitle } from '../../../shared/utils/constants';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserEditComponent } from './user-edit/user-edit.component';

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

  constructor(_tdBaseService: TdBaseService, _toastService: ToastService) {
    super(_tdBaseService, _toastService);
  }

  override ngOnInit(): void {
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
    }));
  }

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

  onAdd() {
    this.openModal('Thêm mới', UserEditComponent);
  }

  onEdit(data: any) {
    this.openModal('Cập nhật thông tin', UserEditComponent, {
      params: data,
    });
  }

  onDetail(data: any) {
    this.openModal('Xem chi tiết', UserEditComponent, {
      params: data,
    });
  }

  onDelete(data: any) {
    this._toastService.success(StatusResponseTitle.SUCCESS, 'Xóa');
  }

  // grid event
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly any[] = [];
  listOfData: readonly any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
}
