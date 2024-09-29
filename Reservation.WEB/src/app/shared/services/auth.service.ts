import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../utils/constants';
import { StorageLocalService } from './storage-local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Kiểm tra nếu người dùng đã đăng nhập
  static isLoggedIn(): boolean {
    return !!StorageLocalService.getItem(LocalStorageKey.Auth);
  }

  // Đăng xuất
  static logout() {
    StorageLocalService.removeItem(LocalStorageKey.Auth);
  }

  static setAuthStorage(item: any): void {
    StorageLocalService.setItem(LocalStorageKey.Auth, item);
  }

  // Lấy token hiện tại
  static getAuthStorage(): string | null {
    return StorageLocalService.getItem(LocalStorageKey.Auth);
  }
}
