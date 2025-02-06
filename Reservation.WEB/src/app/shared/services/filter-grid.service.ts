import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { TdFilterAdvanceComponent } from '../components/ui-control/td-filter-advance/td-filter-advance.component';

@Injectable({
  providedIn: 'root',
})
export class FilterGridService {
  constructor(private _modalService: ModalService) {}

  open(fields: any[]): void {
    this._modalService.open({
      title: 'Tìm kiếm nâng cao',
      width: '60%',
      showHeader: true,
      component: TdFilterAdvanceComponent,
      params: {
        fields: fields,
      },
    });
  }
}
