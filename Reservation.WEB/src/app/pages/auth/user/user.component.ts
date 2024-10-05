import { Component, OnInit } from '@angular/core';
import { TdBaseService } from '../../../shared/services/td-base.service';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { AgGridAngular } from 'ag-grid-angular';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UiControlModule } from '../../../shared/modules/ui-control.module';
import { ColDef } from 'ag-grid-community'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [SharedModule, UiControlModule, AgGridAngular],
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
  ];

  constructor(_tdBaseService: TdBaseService) {
    super(_tdBaseService);
  }

  override ngOnInit(): void {}
}
