import { HttpInterceptorFn } from '@angular/common/http';
import { ICurrentUser } from '../../interfaces/ICurrentUser';
import { catchError, finalize, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { StatusCode } from '../enums';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const Interceptor: HttpInterceptorFn = (req, next) => {
  const auth = AuthService.getAuthStorage(); // Lấy token từ localStorage
  const router = inject(Router); // Khởi tạo router
  // const toastService = inject(ToastService); // Khởi tạo router
  // const loadingService = inject(LoadingService); // Khởi tạo loading

  if (auth) {
    const currentUser = JSON.parse(auth) as ICurrentUser;
    // Clone và thêm Authorization header nếu có token
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    // loadingService.show();
    return next(cloned).pipe(
      catchError((err) => {
        if (err.status === StatusCode.Unauthorized) {
          // Chuyển hướng đến trang đăng nhập khi nhận mã lỗi 401
          router.navigate(['/login']);
        }
        if (err.status === StatusCode.Forbidden) {
          router.navigate(['/error', StatusCode.Forbidden]);
        }
        return throwError(err);
      })
      // finalize(() => loadingService.hide())
    );
  }
  return next(req);
};
