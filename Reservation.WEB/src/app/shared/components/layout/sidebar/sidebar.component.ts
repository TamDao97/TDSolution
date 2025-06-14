import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageService } from '../../../../services/system/page.service';
import { ToastService } from '../../../services/toast.service';
import { IResponse } from '../../../../interfaces/IResponse';
import { StatusCode } from '../../../utils/enums';
import { StatusResponseTitle } from '../../../utils/constants';
import { SharedModule } from '../../../modules/shared.module';
import { IMenu } from '../../../../interfaces/ITree';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class SidebarComponent implements OnInit {
  menuItems: IMenu[] = [];
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _pageService: PageService
  ) { }

  ngOnInit() {
    this.getPageTree()
  }

  getPageTree() {
    this._pageService
      .getPageTree()
      .subscribe((rs: IResponse) => {
        if (rs.status == StatusCode.Ok) {
          this.menuItems = rs.data;
          console.log(this.menuItems);
        } else {
          this._toastService.error(StatusResponseTitle.ERROR, rs.message);
        }
      });

  }

  getHref(menu: any): string {
    return menu?.url ? '/' + menu.url : 'javascript:void(0)';
  }

}
