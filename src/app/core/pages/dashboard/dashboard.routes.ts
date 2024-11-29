import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { AppLayoutComponent } from "../../../layout/app.layout.component";

export const dashboardRoutes: Routes = [
    {
        path: 'administracion',
        component: AppLayoutComponent,
        children:[
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                
            },

            {
                path: 'products',
                component: ProductsComponent
            }
        ]
    }
]