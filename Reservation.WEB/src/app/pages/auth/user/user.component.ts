import { Component, OnInit } from '@angular/core';
import { TdBaseService } from '../../../shared/services/td-base.service';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UiControlModule } from '../../../shared/modules/ui-control.module';
import { ColDef } from 'ag-grid-community';

import { ActionCellRendererComponent } from '../../../shared/components/ui-control/td-ag-grid-table/action-cell-renderer/action-cell-renderer.component';
import { UiGridTableModule } from '../../../shared/modules/ui-grid-table.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [SharedModule, UiControlModule, UiGridTableModule],
})
export class UserComponent extends TdBaseGridComponent implements OnInit {
  override title = 'Quản lý người dùng';

  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
    {
      headerName: 'Hành động',
      field: 'action',
      width: 250,
      cellRenderer: ActionCellRendererComponent, // Sử dụng component hành động
      cellRendererParams: {
        actions: [
          {
            label: 'Xem',
            class: 'fas fa-plus text-success',
            callback: this.onViewClick.bind(this),
          },
          {
            label: 'Sửa',
            class: 'fas fa-edit text-primary  ',
            callback: this.onEditClick.bind(this),
          },
          {
            label: 'Xóa',
            class: 'fas fa-trash text-danger',
            callback: this.onDeleteClick.bind(this),
          },
        ],
      },
    },
  ];

  constructor(_tdBaseService: TdBaseService) {
    super(_tdBaseService);
  }

  override ngOnInit(): void {}

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
