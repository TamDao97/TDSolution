import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class TdBaseService {
  constructor(private _httpClient: HttpClient) {}

  gridLoadData(apiUrl: string, payload: any): Observable<IResponse> {
    return this._httpClient.post<IResponse>(apiUrl, payload);
  }
}
