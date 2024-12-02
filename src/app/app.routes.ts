import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { dashboardRoutes } from './core/pages/dashboard/dashboard.routes';
import { authRoutes } from './core/pages/auth/auth.routes';
import { marketRoutes } from './core/pages/market/market.routes';


export const routes: Routes = [

  {
    path: '',  // Ruta raíz
    component: AppLayoutComponent,  // Componente contenedor
    children: [
      { path: '', redirectTo: 'market', pathMatch: 'full' }, // Redirección por defecto
      ...authRoutes,  // Rutas de autenticación
      ...dashboardRoutes,  // Rutas del dashboard
      ...marketRoutes,  // Rutas de mercado
    ]
  },
  { path: '**', redirectTo: '' }  // Ruta de error 404 (si no existe ruta definida)
];
