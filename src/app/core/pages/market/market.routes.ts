import { Routes } from "@angular/router";
import { MarketComponent } from "./market.component";

export const marketRoutes: Routes = [
    {
        path: 'market',
        component: MarketComponent,
        children: [
            {
				path: '',
				redirectTo: 'market',
				pathMatch: 'full',
			},

			{
				path: '**',
				redirectTo: 'market',
			},
        ]
    }
]