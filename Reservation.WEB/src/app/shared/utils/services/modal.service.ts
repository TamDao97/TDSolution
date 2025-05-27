import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TdModalComponent } from '../../components/ui-control/td-modal/td-modal.component';

export interface IModalOptions {
  title: string;
  width: string;
  component: any;
  showHeader: boolean;
  params?: Partial<any>;
}

@Injectable({
  providedIn: 'root', // Đảm bảo ModalService có sẵn toàn cục
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open(options: IModalOptions) {
    const modalRef = this.modalService.open(TdModalComponent);
    modalRef.componentInstance.title = options.title;
    modalRef.componentInstance.showHeader = options.showHeader;
    modalRef.componentInstance.modalWidth = options.width;

    // Gọi phương thức để lưu component mà bạn muốn load
    modalRef.componentInstance.loadComponentOnInit(
      options.component,
      options.params
    );
  }
}
