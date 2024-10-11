import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'td-modal',
  templateUrl: './td-modal.component.html',
  styleUrls: ['./td-modal.component.css'],
})
export class TdModalComponent implements AfterViewInit {
  @Input() title: string = ''; // Tiêu đề modal
  @Input() showHeader: boolean = true; // Kiểm soát việc hiển thị header
  @Input() modalWidth: string = '500px'; // Kiểm soát độ rộng modal, mặc định là 500px

  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContent!: ViewContainerRef;

  private componentToLoad: any; // Tham số tạm thời để lưu component sẽ được load

  constructor(
    public activeModal: NgbActiveModal,
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    // Gọi loadComponent trong ngAfterViewInit để đảm bảo dynamicContent đã được khởi tạo
    if (this.componentToLoad) {
      this.loadComponent(this.componentToLoad);
    }
  }

  loadComponent(component: any) {
    // Kiểm tra ViewChild đã được khởi tạo trước khi sử dụng
    if (this.dynamicContent) {
      const factory = this.resolver.resolveComponentFactory(component);
      this.dynamicContent.clear(); // Gọi clear để xóa nội dung cũ
      this.dynamicContent.createComponent(factory);
    } else {
      console.error('ViewChild dynamicContent chưa sẵn sàng.');
    }
  }

  // Thay đổi để lưu component mà bạn muốn load
  loadComponentOnInit(component: any) {
    this.componentToLoad = component;
  }
}
