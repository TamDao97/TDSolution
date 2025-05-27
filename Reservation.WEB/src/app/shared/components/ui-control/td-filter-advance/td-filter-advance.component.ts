import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { IControl } from '../../../interfaces/IControl';
import { ControlTypeEnum } from '../../../utils/enums';

@Component({
  selector: 'td-filter-advance',
  templateUrl: './td-filter-advance.component.html',
  styleUrls: ['./td-filter-advance.component.css'],
})
export class TdFilterAdvanceComponent implements OnInit {
  fields: IControl[];
  controlTypeEnum = ControlTypeEnum;
  constructor() {}

  ngOnInit() {
    console.log(this.fields);
  }
}
