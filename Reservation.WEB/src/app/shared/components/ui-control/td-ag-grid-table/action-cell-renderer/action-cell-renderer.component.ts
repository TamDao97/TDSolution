import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css'],
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  // Khởi tạo dữ liệu khi cell được render
  agInit(params: any): void {
    this.params = params;
  }

  // Hàm update dữ liệu khi cell có sự thay đổi
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
