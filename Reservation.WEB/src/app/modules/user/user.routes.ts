import { Route } from '@angular/router';
import { appPaths } from '../../app-routes';
import { userPaths } from '~modules/user/shared/user-routes';
import { authenticationGuard } from '~modules/shared/guards/authentication.guard';

export const USER_ROUTES: Route[] = [
  {
    // path: userPaths.dashboard,
    // component: DashboardPageComponent,
    // canActivate: [authenticationGuard],
  },
  {
    // path: userPaths.myHeroes,
    // component: MyHeroesPageComponent,
    // canActivate: [authenticationGuard],
  },
  {
    // path: userPaths.myAccount,
    // component: MyAccountComponent,
    // canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: appPaths.error404 },
];
