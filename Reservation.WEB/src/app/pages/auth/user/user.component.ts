import { Component, OnInit, ViewChild } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { TdBaseService } from '../../../shared/utils/services/td-base.service';
import { ToastService } from '../../../shared/services/toast.service';
import { StatusResponseTitle } from '../../../shared/utils/constants';
import { UserEditComponent } from './user-edit/user-edit.component';
import { IColumn, IControl } from '../../../shared/interfaces/IBase';
import { ControlTypeEnum } from '../../../shared/utils/enums';
import { FilterModalComponent } from '../../../shared/components/filter-modal/filter-modal.component';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserComponent extends TdBaseGridComponent implements OnInit {
  override title = 'Quản lý người dùng';

  filterControl: IControl[] = [];
  objFilter: any = {};
  endpoint = `${this._userService.apiUrl}/get-by-filter`;

  constructor(
    _tdBaseService: TdBaseService,
    _toastService: ToastService,
    private _userService: UserService
  ) {
    super(_tdBaseService, _toastService);
  }

  override ngOnInit(): void {
    this.objFilter = this.buildAdvanceFilter();
    this.gridColumns = this.buildTableColumn();
    this.gridLoadData(this.endpoint, this.objFilter);
  }

  // #region Advance Filter
  buildAdvanceFilter(): any {
    this.filterControl = [
      {
        label: 'Quyền',
        type: ControlTypeEnum.Select,
        colClass: 'col-6',
        name: 'role',
        placeHolder: '--Quyền--',
        order: 1,
        options: [
          {
            text: 'Admin',
            value: 1,
          },
          {
            text: 'User',
            value: 2,
          },
        ],
      },
      {
        label: 'Trạng thái',
        type: ControlTypeEnum.Select,
        colClass: 'col-6',
        name: 'status',
        placeHolder: '--Trạng thái--',
        order: 1,
        options: [
          {
            text: 'Hoạt động',
            value: 1,
          },
          {
            text: 'Khóa',
            value: 2,
          },
        ],
      },
      {
        label: 'Giới tính',
        type: ControlTypeEnum.Radio,
        colClass: 'col-4',
        name: 'gender',
        order: 1,
        options: [
          {
            text: 'Tất cả',
            value: null,
          },
          {
            text: 'Nam',
            value: 1,
          },
          {
            text: 'Nữ',
            value: 2,
          },
        ],
      },
    ];

    this.filterControl.forEach((element: IControl) => {
      this.objFilter[element.name] = null;
    });

    return this.objFilter;
  }
  // #endregion

  // #region Table
  buildTableColumn(): IColumn[] {
    return [
      {
        field: 'displayName',
        header: 'Tên người dùng',
        class: 'text-center',
        type: 'template',
        sort: true,
        sortBy: 'asc',
        // customTemplate: (data: any) => {
        //   return `${data.displayName} <p nz-typography nzCopyable nzCopyText="${data.userName}">${data.userName}.</p>`;
        // },
      },
      {
        field: 'email',
        header: 'Email',
        class: 'text-center',
        type: 'text',
        sort: true,
        sortBy: 'asc',
      },
      {
        field: 'phoneNumber',
        header: 'Sđt',
        class: 'text-center',
        type: 'text',
        sort: true,
        sortBy: 'asc',
      },
      {
        field: 'isLockout',
        header: 'Trạng thái',
        class: 'text-center',
        type: 'template',
        sort: true,
        sortBy: 'asc',
        customTemplate: (data: any) => {
          if (data.isLockout) {
            return 'Khóa';
          } else return 'Hoạt động';
        },
      },
      {
        field: 'dateModify',
        header: 'Cập nhật cuối',
        class: 'text-center',
        type: 'template',
        sort: true,
        sortBy: 'asc',
      },
    ];
  }
  // #endregion

  onSearch(): void {
    this.gridLoadData(this.endpoint, this.objFilter);
  }

  onSearchAdvance(): void {
    this.openModal(
      {
        title: 'Tìm kiếm nâng cao',
        width: 800,
      },
      FilterModalComponent,
      {
        controls: this.filterControl,
      }
    ).afterClose.subscribe((result: any) => {
      this.gridLoadData(this.endpoint, result);
    });
  }

  onAdd() {
    this.openModal(
      {
        title: 'Thêm mới người dùng',
        width: 800,
      },
      UserEditComponent
    ).afterClose.subscribe((result: any) => {
      this.gridLoadData(this.endpoint, result);
    });
  }

  onEdit(data: any) {
    this.openModal(
      {
        title: 'Cập nhật người dùng',
        width: 800,
      },
      UserEditComponent,
      {
        params: data,
      }
    );
  }

  onDetail(data: any) {
    this.openModal(
      {
        title: 'Xem chi tiết',
        width: 800,
      },
      UserEditComponent,
      {
        params: data,
      }
    );
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
