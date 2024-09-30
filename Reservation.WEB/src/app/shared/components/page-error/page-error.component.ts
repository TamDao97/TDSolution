import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusCode } from '../../utils/enums';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css'],
})
export class PageErrorComponent implements OnInit {
  statusCode: number | null;
  statusMessage: string = '';
  constructor(private _router: ActivatedRoute) {}

  ngOnInit(): void {
    this._router.paramMap.subscribe((params) => {
      this.statusCode = Number(params.get('statusCode'));
    });

    switch (this.statusCode) {
      case StatusCode.NotFound:
        this.statusMessage = 'Không tìm thấy trang!';
        break;
      case StatusCode.Unauthorized:
        this.statusMessage = 'Xác thực tài khoản không thành công!';
        break;
      case StatusCode.Forbidden:
        this.statusMessage = 'Không có quyền truy cập dữ liệu!';
        break;
      default:
        break;
    }
  }
}
