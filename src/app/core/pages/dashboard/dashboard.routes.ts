import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { AppLayoutComponent } from "../../../layout/app.layout.component";
import { UsersComponent } from "./users/users.component";
import { publicGuard } from "../../../shared/guards/auth.guard";

export const dashboardRoutes: Routes = [
    {
        path: 'administracion',  // Ruta principal del dashboard
        //canActivate:[publicGuard()],
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