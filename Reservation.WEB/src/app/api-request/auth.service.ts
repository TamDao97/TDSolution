import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.domainUrl}`;

  constructor(private _http: HttpClient) {}

  login(payload: any): Observable<any> {
    const endpoint = `${this.apiUrl}/api/login`;
    return this._http.post<any>(endpoint, payload).pipe(
      map((response) => {
        localStorage.setItem('access_token', response.token);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
