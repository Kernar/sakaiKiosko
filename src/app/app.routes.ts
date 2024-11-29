import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {MarketComponent } from './core/pages/market/market.component';
import { dashboardRoutes } from './core/pages/dashboard/dashboard.routes';
import { authRoutes } from './core/pages/auth/auth.routes';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'market',
    pathMatch: 'full',
  },
  ...authRoutes,
  ...dashboardRoutes,
];
