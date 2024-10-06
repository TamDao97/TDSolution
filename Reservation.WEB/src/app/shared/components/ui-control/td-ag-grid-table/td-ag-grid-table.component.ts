import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'td-ag-grid-table',
  templateUrl: './td-ag-grid-table.component.html',
  styleUrls: ['./td-ag-grid-table.component.css'],
})
export class TdAgGridTableComponent {
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];
  @Input() defaultColDef: ColDef = {
    sortable: false,
    filter: false,
    resizable: true,
  };

  gridOptions: any = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'single',
  };
}
