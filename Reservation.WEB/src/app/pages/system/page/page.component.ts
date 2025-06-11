import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { TdBaseGridComponent } from '../../../shared/utils/extends-components/td-base-grid.component';
import { PageService } from '../../../services/system/page.service';
import { keyPage, StatusResponseMessage, StatusResponseTitle } from '../../../shared/utils/constants';
import { IDropdown } from '../../../interfaces/IDropdown';
import { StatusCode } from '../../../shared/utils/enums';
import { IResponse } from '../../../interfaces/IResponse';
import { ITree } from '../../../interfaces/ITree';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PageComponent extends TdBaseGridComponent implements OnInit {
  override title = 'Quản lý menu';
  override pageKey = keyPage.USER;

  frmGroup!: FormGroup;
  lstPage: IDropdown[] = [];
  pageTreeData: ITree[] = [];

  constructor(
    private _fb: FormBuilder,
    _toastService: ToastService,
    private _pageService: PageService
  ) {
    super(_pageService, _toastService);
  }

  expandedKeys: any[] = [];
  getAllKeys(nodes: any[]): string[] {
    let keys: string[] = [];
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(this.getAllKeys(node.children));
      }
    }
    return keys;
  }

  override ngOnInit() {
    this.frmGroup = this._fb.group({
      id: [null],
      idParent: [null],
      name: [null, [Validators.required]],
      url: [null],
      icon: [null],
      permissionCode: [null],
      order: [null],
      isActive: [false],
      isTab: [false],
      isHomePage: [false],
    });
    this.expandedKeys = this.getAllKeys(this.pageTreeData);
    this.getPageTree();
    this.dropdownPage();
  }

  dropdownPage() {
    this._pageService
      .dropdownPage()
      .subscribe((rs: IResponse) => {
        if (rs.status == StatusCode.Ok) {
          this.lstPage = rs.data;
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      });

  }

  getPageTree() {
    this._pageService
      .getPageTree()
      .subscribe((rs: IResponse) => {
        if (rs.status == StatusCode.Ok) {
          this.pageTreeData = rs.data;
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      });

  }

  onDrop(event: any): void {
    console.log('Drop event:', event);
    const dragNode = event.dragNode;
    const dropNode = event.node;

    console.log('Kéo node:', dragNode?.title);
    console.log('Thả vào node:', dropNode?.title);

    // 👇 Ví dụ xử lý: gọi API cập nhật vị trí hoặc cập nhật lại mảng nodes
    // this.updateTreeStructure(dragNode, dropNode, dropPosition);
  }


  onNodeClick(event: any): void {
    console.log('Clicked node:', event.node);
  }

  onSave() {
    const isValid = this.validateForm(this.frmGroup);
    if (!isValid) return;

    const payload = {
      ...this.frmGroup.value,
    }

    if (!payload.id) {
      this._pageService
        .create(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.frmGroup.reset();
            this.getPageTree();
            this.dropdownPage();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.ADD_SUCCESS)
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    } else {
      this._pageService
        .update(payload)
        .subscribe((rs: IResponse) => {
          if (rs.status == StatusCode.Ok) {
            this.getPageTree();
            this.dropdownPage();
            this._toastService.success(StatusResponseTitle.SUCCESS, StatusResponseMessage.UPDATE_SUCCESS);
          } else {
            this._toastService.error(StatusResponseTitle.ERROR, rs.message);
          }
        });
    }
  }

  onReset() {
    this.frmGroup.reset();
  }
}

