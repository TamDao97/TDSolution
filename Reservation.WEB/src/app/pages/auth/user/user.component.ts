import { Component, OnInit } from '@angular/core';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ToastService } from '../../../shared/services/toast.service';
import { keyPage, StatusResponseMessage, StatusResponseTitle } from '../../../shared/utils/constants';
import { UserEditComponent } from './user-edit/user-edit.component';
import { IColumn, IControl } from '../../../shared/interfaces/IBase';
import { ControlTypeEnum, StatusCode } from '../../../shared/utils/enums';
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
  override pageKey = keyPage.USER;

  filterControl: IControl[] = [];
  objFilter: any = {
    keyword: null,
  };

  constructor(
    _toastService: ToastService,
    _userService: UserService
  ) {
    super(_userService, _toastService);
  }

  override ngOnInit(): void {
    this.objFilter = {
      ...this.objFilter,
      ...this.buildAdvanceFilter(),
    };
    this.gridColumns = this.buildTableColumn();
    this.gridLoadData(this.objFilter);
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
    this.gridLoadData(this.objFilter);
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
        keyPage: this.pageKey,
      }
    ).afterClose.subscribe((result: any) => {
      this.objFilter = {
        ...this.objFilter,
        ...result,
      }
      this.gridLoadData(this.objFilter);
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
      this.gridLoadData(this.objFilter);
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
        isDisabled: false
      }
    ).afterClose.subscribe((result: any) => {
      this.gridLoadData(this.objFilter);
    });
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
        isDisabled: true
      }
    );
  }

  onDelete(data: any) {
    this.confirmModal('Bạn có chắc chắn muốn xoá?', () => {
      this._tdBaseService.delete(data.id).subscribe((rs) => {
        if (rs.status == StatusCode.Ok) {
          this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.DELETE_SUCCESS);
          this.gridLoadData(this.objFilter);
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      })
    });
  }

  onDeleteMany() {
    if (this.setOfCheckedId.size == 0) {
      this._toastService.warning(StatusResponseTitle.WARNING, StatusResponseMessage.NOT_SELECTED);
      return;
    }

    const ids = Array.from(this.setOfCheckedId);
    this.confirmModal('Bạn có chắc chắn muốn xoá?', () => {
      this._tdBaseService.deleteMany(ids).subscribe((rs) => {
        if (rs.status == StatusCode.Ok) {
          this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.DELETE_SUCCESS);
          this.gridLoadData(this.objFilter);
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      })
    });
  }
}
