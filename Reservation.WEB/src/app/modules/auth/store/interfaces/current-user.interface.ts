import { User } from '~modules/user/shared/user.model';

export interface ICurrentUser {
  id: string | null;
  userName: string | null;
  displayName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAdmin: boolean | null;
  permission: Array<string> | null;
  language: string | null;
}
