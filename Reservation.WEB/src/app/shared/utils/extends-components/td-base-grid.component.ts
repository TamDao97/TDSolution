import { Component, Type } from '@angular/core';
import { TdBaseComponent } from './td-base.component';
import { IPagingData } from '../../../interfaces/IPagingData';
import { StatusCode } from '../enums';
import { TdBaseService } from '../services/td-base.service';
import { ToastService } from '../../services/toast.service';
import { StatusResponseTitle } from '../constants';

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

  constructor(
    public _tdBaseService: TdBaseService,
    public _toastService: ToastService
  ) {
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
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      },
      (error) => {
        this._toastService.error(StatusResponseTitle.ERROR, error.message);
      },
      () => {
        // Khi hoàn thành
        this.isLoading = false;
      }
    );
  }
}
