export interface ICurrentUser {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  isAdmin: string;
  accessToken: string;
  refreshToken: string;
  permissions: string[];
}
