import { TdModalComponent } from './../components/ui-control/td-modal/td-modal.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root', // Đảm bảo ModalService có sẵn toàn cục
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModalWithComponent(
    title: string,
    component: any,
    showHeader: boolean = true,
    modalWidth: string = '1200px'
  ) {
    const modalRef = this.modalService.open(TdModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.showHeader = showHeader;
    modalRef.componentInstance.modalWidth = modalWidth;

    // Gọi phương thức để lưu component mà bạn muốn load
    modalRef.componentInstance.loadComponentOnInit(component);
  }
}
