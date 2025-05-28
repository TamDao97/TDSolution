import { Page404Component } from './shared/components/page-404/page-404.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './shared/utils/auth/auth-guard';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';
import { UserComponent } from './pages/auth/user/user.component';
import { Routes } from '@angular/router';

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
        redirectTo: 'ui-component',
        pathMatch: 'full',
      },
      {
        path: 'user',
        component: UserComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'error/:statusCode', component: PageErrorComponent },
  { path: '**', component: Page404Component }, // Wildcard route for 404 page
];
