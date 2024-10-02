import { Component } from '@angular/core';
import { TdBaseComponent } from './td-base.component';
import { TdBaseService } from '../../services/td-base.service';

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

  ngOnInit() {}

  gridLoadData(apiUrl: string, filter: any): void {
    this._tdBaseService.
    // this.gridData;
  }
}
