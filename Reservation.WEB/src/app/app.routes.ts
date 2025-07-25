import { Page404Component } from './shared/components/page-404/page-404.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './shared/utils/auth/auth-guard';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';
import { Routes } from '@angular/router';
import { PageComponent } from './pages/system/page/page.component';
import { RoleComponent } from './pages/system/role/role.component';
import { UserComponent } from './pages/system/auth/user/user.component';
import { LoginComponent } from './pages/system/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent, // Layout chính của ứng dụng
    children: [
      {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full',
      },
      {
        path: 'page',
        component: PageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'error/:statusCode', component: PageErrorComponent },
  { path: '**', component: Page404Component }, // Wildcard route for 404 page
];
