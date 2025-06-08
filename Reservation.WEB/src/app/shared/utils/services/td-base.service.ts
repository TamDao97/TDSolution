import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../../interfaces/IResponse';
import { environment } from '../../../../env.development';

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
    return this._httpClient.delete<IResponse>(`${this.apiUrl}/delete/${id}`);
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
