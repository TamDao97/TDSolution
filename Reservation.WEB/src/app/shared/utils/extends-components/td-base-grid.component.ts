import { Component } from '@angular/core';
import { TdBaseComponent } from './td-base.component';
import { TdBaseService } from '../../services/td-base.service';
import { IPagingData } from '../../../interfaces/IPagingData';
import { StatusCode, ToastStatus } from '../enums';

@Component({
  template: '',
})
export abstract class TdBaseGridComponent extends TdBaseComponent {
  constructor(private _tdBaseService: TdBaseService) {
    super();
  }

  title: string;
  totalPage: number;
  totalRecord: number;
  pageNumber: number;
  pageSize: number;

  gridData: any[];
  isLoading: Boolean = false;

  ngOnInit() {
    // this.gridLoadData();
  }

  gridLoadData(apiUrl: string, filter: any): void {
    this.isLoading = true;
    this._tdBaseService.gridLoadData(apiUrl, filter).subscribe(
      (rs) => {
        if (rs.status == StatusCode.Ok) {
          const obj = rs.data as IPagingData;
          this.gridData = obj.data;
          this.totalRecord = obj.totalRecord;
          this.totalPage = obj.totalPage;
          this.pageNumber = obj.pageNumber;
        } else {
          this.toast(ToastStatus.Error, rs.message);
        }
      },
      (error) => {
        this.toast(ToastStatus.Error, error.message);
      }, // Xử lý lỗi nếu có
      () => {
        this.isLoading = false;
      } // Khi hoàn thành
    );
  }
}
