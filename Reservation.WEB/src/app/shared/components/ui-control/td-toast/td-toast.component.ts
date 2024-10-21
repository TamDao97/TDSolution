import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../../utils/services/toast.service';

@Component({
  selector: 'td-toast',
  templateUrl: './td-toast.component.html',
  styleUrls: ['./td-toast.component.scss'],
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class TdToastComponent implements OnInit {
  constructor(public _toastService: ToastService) {}

  ngOnInit(): void {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
