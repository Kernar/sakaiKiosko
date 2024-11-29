import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {MarketComponent } from './core/pages/market/market.component';
import { dashboardRoutes } from './core/pages/dashboard/dashboard.routes';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'market',
    pathMatch: 'full',
  },

  ...dashboardRoutes,
];
