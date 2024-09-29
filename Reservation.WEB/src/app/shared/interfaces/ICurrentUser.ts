export interface ICurrentUser {
  id: string;
  userName: string;
  displayName: string;
  isAdmin: string;
  accessToken: string;
  refreshToken: string;
  permissions: string[];
}
