import { Injectable } from '@angular/core';
import { environment } from '../../../env.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = `${environment.apiUrl}/user`;
  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.apiUrl}/user-getbyid/${id}`);
  }
}
