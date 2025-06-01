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
