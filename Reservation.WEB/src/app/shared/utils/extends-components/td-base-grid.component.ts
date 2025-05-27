import { Component } from '@angular/core';
import { TdBaseComponent } from './td-base.component';
import { IPagingData } from '../../../interfaces/IPagingData';
import { StatusCode, ToastStatus } from '../enums';
import { TdBaseService } from '../services/td-base.service';

@Component({
  template: '',
})
export class TdBaseGridComponent extends TdBaseComponent {
  title: string = '';
  gridData: any[] = [];
  totalPage: number = 0;
  totalRecord: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10;
  isLoading: Boolean = false;

  constructor(private _tdBaseService: TdBaseService) {
    super();
  }

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
