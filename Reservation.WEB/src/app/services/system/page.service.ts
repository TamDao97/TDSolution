import { Injectable } from '@angular/core';
import { TdBaseService } from '../../shared/utils/services/td-base.service';
import { environment } from '../../../env.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class PageService extends TdBaseService {
  override apiUrl: string = `${environment.apiUrl}/page`;
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  dropdownPage(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(`${this.apiUrl}/dropdown-page`);
  }

  getPageTree(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(`${this.apiUrl}/get-page-tree`);
  }
}
