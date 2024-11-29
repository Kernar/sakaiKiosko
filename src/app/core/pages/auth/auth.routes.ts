import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";



export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
				path: '',
				redirectTo: 'login',
				pathMatch: 'full',
			},

			{
				path: '**',
				redirectTo: 'login',
			},
        ]
    }
]