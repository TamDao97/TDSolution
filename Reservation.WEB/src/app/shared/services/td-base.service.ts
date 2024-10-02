import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/IResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TdBaseService {
  constructor(private _httpClient: HttpClient) {}

  gridLoadData(apiUrl: string, payload: any): any {}
}
