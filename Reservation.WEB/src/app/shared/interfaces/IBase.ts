import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { IDropdown } from '../../interfaces/IDropdown';
import { ControlTypeEnum } from '../utils/enums';

export interface IControl {
  label?: string;
  placeHolder?: any;
  colClass: string;
  name: string;
  order: number;
  type: ControlTypeEnum;
  options?: IDropdown[];
}

export interface IModalOptions {
  title: string;
  width: number;
}

export interface IColumn {
  field: string;
  header: string;
  class?: string;
  sort: true | false;
  sortBy: 'asc' | 'desc';
  type:
    | 'text'
    | 'date'
    | 'daterange'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'file'
    | 'image'
    | 'video'
    | 'audio'
    | 'currency'
    | 'template';
  customTemplate?: () => any;
}
