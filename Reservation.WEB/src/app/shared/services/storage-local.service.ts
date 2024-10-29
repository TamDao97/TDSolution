import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageLocalService {
  constructor() {}

  // Lưu trữ dữ liệu vào localStorage
  public static setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Lấy dữ liệu từ localStorage
  public static getItem(key: string): string | null {
    try {
      return localStorage.getItem(key) ?? null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }

  // Xóa dữ liệu với key từ localStorage
  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }

  // Xóa tất cả dữ liệu trong localStorage
  public static clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

  // Kiểm tra xem key có tồn tại trong localStorage không
  public static hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
