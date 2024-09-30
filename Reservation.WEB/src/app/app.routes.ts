import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Page404Component } from './shared/components/page-404/page-404.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UiControlComponent } from './shared/components/ui-control/ui-control.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/utils/auth/auth-guard';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';

export const routes: Routes = [
  {
    path: 'ui-component',
    component: UiControlComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent, // Layout chính của ứng dụng
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'ui-component',
        pathMatch: 'full',
      },
    ],
  },
  { path: 'error/:statusCode', component: PageErrorComponent },
  { path: '**', component: Page404Component }, // Wildcard route for 404 page
];
