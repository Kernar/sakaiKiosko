import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {MarketComponent } from './core/pages/market/market.component';

export const routes: Routes = [

  {
    path: '',
    component:AppLayoutComponent,
    children:[
      {path:'',component:MarketComponent},
    ]
  }
];
