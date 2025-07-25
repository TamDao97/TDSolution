import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class TdBaseService {
  apiUrl: string;
  constructor(public _httpClient: HttpClient) { }

  gridLoadData(payload: any): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/get-by-filter`, payload);
  }

  create(payload: any): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/create`, payload);
  }

  update(payload: any): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/update`, payload);
  }

  delete(id: string): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/delete/${id}`, null);
  }

  deleteMany(ids: string[]): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/delete-many`, ids);
  }

  search(payload: any): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this.apiUrl}/search`, payload);
  }

  getById(id: string): Observable<IResponse> {
    return this._httpClient.get<IResponse>(`${this.apiUrl}/get-by-id/${id}`);
  }

  getAll(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(`${this.apiUrl}/get-all`);
  }
}
