import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ICurrentUser } from '../../interfaces/ICurrentUser';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const Interceptor: HttpInterceptorFn = (req, next) => {
  const auth = AuthService.getAuthStorage(); // Lấy token từ localStorage
  const router = inject(Router); // Khởi tạo router
  if (auth) {
    const currentUser = JSON.parse(auth) as ICurrentUser;
    // Clone và thêm Authorization header nếu có token
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    return next(cloned).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Chuyển hướng đến trang đăng nhập khi nhận mã lỗi 401
          router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
  return next(req);
};
