import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  Renderer2,
  ElementRef,
  Inject,
  ComponentRef,
  Type,
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
  private params: Partial<any>;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _renderer: Renderer2,
    private _el: ElementRef,
    public _activeModal: NgbActiveModal,
    private _resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    this.setWidthModal(this.modalWidth);
    this.loadComponent(this.componentToLoad, this.params);
  }

  setWidthModal(width: any): void {
    // Truy cập vào element bên ngoài component bằng class
    const outsideElement = this._document.querySelector('.modal-dialog');
    if (outsideElement) {
      // Sử dụng Renderer2 để thay đổi style
      this._renderer.setStyle(outsideElement, 'max-width', this.modalWidth);
      this._renderer.addClass(outsideElement, 'highlight');
    }
  }

  loadComponent<T extends object>(component: Type<T>, params: Partial<T>) {
    // Kiểm tra ViewChild đã được khởi tạo trước khi sử dụng
    if (this.dynamicContent) {
      const factory = this._resolver.resolveComponentFactory(component);
      this.dynamicContent.clear(); // Gọi clear để xóa nội dung cũ
      const componentRef: ComponentRef<T> =
        this.dynamicContent.createComponent(factory);

      // Truyền params vào component động nếu có
      if (params) Object.assign(componentRef.instance, params);

      // Nếu component động cần xử lý change detection
      componentRef.changeDetectorRef.detectChanges();
    } else {
      console.error('ViewChild dynamicContent chưa sẵn sàng.');
    }
  }

  // Thay đổi để lưu component mà bạn muốn load
  loadComponentOnInit<T extends object>(component: any, params: Partial<T>) {
    this.componentToLoad = component;
    this.params = params;
  }
}
