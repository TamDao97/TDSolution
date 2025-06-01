import { Component, inject, Input, OnInit } from '@angular/core';
import { IControl } from '../../interfaces/IBase';
import { CommonModule } from '@angular/common';
import { ControlTypeEnum } from '../../utils/enums';
import { SharedModule } from '../../modules/shared.module';
import {
  NzCheckboxModule,
  NzCheckBoxOptionInterface,
} from 'ng-zorro-antd/checkbox';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class FilterModalComponent implements OnInit {
  params: any = inject(NZ_MODAL_DATA);
  modalRef: any = inject(NzModalRef);
  @Input() controls: IControl[] = [];
  controlTypeEnum = ControlTypeEnum;

  objFilter: any = {};
  constructor() {}

  options1: NzCheckBoxOptionInterface[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  ngOnInit() {
    this.controls = this.params.controls as IControl[];
    this.controls.forEach((element: IControl) => {
      this.objFilter[element.name] = null;
    });
  }

  onDateChange(e: any) {}

  onDateOk(e: any) {}

  onDateRangeChange(e: any) {}

  onDateRangeOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }

  onSearch(): void {
    this.modalRef.close(this.objFilter);
  }

  onClear(): void {
    this.controls.forEach((element: IControl) => {
      this.objFilter[element.name] = null;
    });
  }
}
