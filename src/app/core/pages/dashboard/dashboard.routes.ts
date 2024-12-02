import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { AppLayoutComponent } from "../../../layout/app.layout.component";
import { UsersComponent } from "./users/users.component";

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',  // Ruta principal del dashboard
        component: DashboardComponent,  // Carga el DashboardComponent dentro de AppLayoutComponent
        children: [  // Rutas hijas que cargan dentro de DashboardComponent
          {
            path: 'products',
            component: ProductsComponent
          },
          {
            path: 'users',
            component: UsersComponent
          }
        ]
      }
]