import { ControlTypeEnum } from '../utils/enums';

export interface IControl {
  label?: string;
  type: ControlTypeEnum;
  placeHolder?: string;
  colClass: string;
  ngModel: string;
  order: number;
}
