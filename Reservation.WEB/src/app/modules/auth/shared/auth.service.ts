import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from '~environments/environment';
import { IApiResponse } from '../../shared/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = '';

  constructor(private httpClient: HttpClient) {}

  static decodeToken(token: string): { exp: number } | null {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  logIn(payload: any): Observable<IApiResponse | null> {
    return this.httpClient.post<IApiResponse>(`${environment.reservationHost}/Auth/login`, payload);
  }

  // signup({ firstname, email, password }: RegisterPayload): Observable<AuthUserData | null> {
  //   return this.apollo
  //     .mutate({
  //       mutation: signupMutation,
  //       variables: {
  //         firstname,
  //         email,
  //         password,
  //       },
  //     })
  //     .pipe(
  //       map((response: unknown) => {
  //         const registerData = (response as RegisterResponse).data?.signup;
  //         if (registerData) {
  //           this.saveUserData(registerData);
  //           return registerData;
  //         }
  //         return null;
  //       }),
  //     );
  // }

  // updateUser(userData: UpdateUserData): Observable<User | null> {
  //   return this.apollo
  //     .mutate({
  //       mutation: updateUserMutation,
  //       variables: userData,
  //     })
  //     .pipe(
  //       map((response: unknown) => {
  //         const updateUserData = (response as UpdateUserResponse).data?.updateUser;
  //         if (updateUserData) {
  //           this.authRepository.setUser(updateUserData);
  //           return updateUserData;
  //         }
  //         return null;
  //       }),
  //     );
  // }

  // changePassword(oldPassword: string, newPassword: string): Observable<OkData | null> {
  //   return this.apollo
  //     .mutate({
  //       mutation: changePasswordMutation,
  //       variables: {
  //         oldPassword,
  //         newPassword,
  //       },
  //     })
  //     .pipe(
  //       map((response: unknown) => {
  //         const changePasswordData = (response as ChangePasswordResponse).data?.changePassword;
  //         if (changePasswordData) {
  //           return changePasswordData;
  //         }
  //         return null;
  //       }),
  //     );
  // }

  // deleteAccount(password: string): Observable<OkData | null> {
  //   return this.apollo
  //     .mutate({
  //       mutation: deleteAccountMutation,
  //       variables: {
  //         password,
  //       },
  //     })
  //     .pipe(
  //       map((response: unknown) => {
  //         const deleteAccountData = (response as DeleteAccountResponse).data?.deleteAccount;
  //         if (deleteAccountData) {
  //           return deleteAccountData;
  //         }
  //         return null;
  //       }),
  //     );
  // }

  // refreshToken(): Observable<UpdateTokenData | null> {
  //   const refreshToken = this.authRepository.getRefreshTokenValue() ?? '';
  //   return this.apollo
  //     .mutate({
  //       mutation: refreshTokenMutation,
  //       context: {
  //         headers: { [AppConfig.bypassAuthorization]: 'true' },
  //       },
  //       variables: {
  //         refreshToken,
  //       },
  //     })
  //     .pipe(
  //       map((response: unknown) => {
  //         const refreshTokenData = (response as RefreshTokenResponse).data?.refreshToken;
  //         if (refreshTokenData) {
  //           this.authRepository.updateTokens(
  //             refreshTokenData.accessToken,
  //             refreshTokenData.refreshToken,
  //           );
  //           return refreshTokenData;
  //         }
  //         return null;
  //       }),
  //     );
  // }
}
