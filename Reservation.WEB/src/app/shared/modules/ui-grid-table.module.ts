import { NgModule } from '@angular/core';
import { ActionCellRendererComponent } from '../components/ui-control/td-ag-grid-table/action-cell-renderer/action-cell-renderer.component';
import { TdAgGridTableComponent } from '../components/ui-control/td-ag-grid-table/td-ag-grid-table.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [TdAgGridTableComponent, ActionCellRendererComponent],
  imports: [SharedModule, AgGridAngular, AgGridModule],
  exports: [TdAgGridTableComponent, ActionCellRendererComponent],
})
export class UiGridTableModule {}
