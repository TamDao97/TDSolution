import { Injectable } from '@angular/core';
import { environment } from '../../../env.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/IResponse';
import { TdBaseService } from '../../shared/utils/services/td-base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends TdBaseService {
  override apiUrl: string = `${environment.apiUrl}/user`;
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getUserProfile(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(`${this.apiUrl}/get-user-profile`);
  }
}
