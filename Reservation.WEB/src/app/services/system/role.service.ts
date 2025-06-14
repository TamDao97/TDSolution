import { Injectable } from '@angular/core';
import { TdBaseService } from '../../shared/utils/services/td-base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env.development';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends TdBaseService {
  override apiUrl: string = `${environment.apiUrl}/role`;
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }
}
