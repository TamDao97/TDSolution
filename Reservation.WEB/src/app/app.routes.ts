import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Page404Component } from './shared/components/page-404/page-404.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UiControlComponent } from './shared/components/ui-control/ui-control.component';

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
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: Page404Component }, // Wildcard route for 404 page
];
