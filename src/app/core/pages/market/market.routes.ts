import { Routes } from "@angular/router";
import { MarketComponent } from "./market.component";
import { DetailProductsComponent } from "./detail-products/detail-products.component";
import { MarketProductsComponent } from "./market-products/market-products.component";
import { CartComponent } from "./cart/cart.component";
import { publicGuard } from "../../../shared/guards/auth.guard";

export const marketRoutes: Routes = [
    {
        path: 'market',
        
        component: MarketComponent,
        children: [
            {
                path: '',
                redirectTo: 'product',  // Redirige a productos si no se proporciona ningún path
                pathMatch: 'full'
            },
            {
                path: 'product',
                component: MarketProductsComponent
            },
            {
                path: 'detail-product/:id',
                component: DetailProductsComponent
            },
            {
                path: 'cart',
                canActivate:[publicGuard()],
                component: CartComponent
            }
        ]
    }
]