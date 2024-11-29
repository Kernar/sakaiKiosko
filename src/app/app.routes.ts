import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { dashboardRoutes } from './core/pages/dashboard/dashboard.routes';
import { authRoutes } from './core/pages/auth/auth.routes';
import { marketRoutes } from './core/pages/market/market.routes';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'market',
    pathMatch: 'full',
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...marketRoutes
];
