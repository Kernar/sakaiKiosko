import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RevoverComponent } from "./recover/revover.component";
import { publicGuard } from "../../../shared/guards/auth.guard";



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
				path:'login',
				component:LoginComponent
			},
			{
				path: 'register',
				
				component: RegisterComponent
			},
			{
				path: 'forgot-password',
				component: RevoverComponent

			},

			{
				path: '**',
				redirectTo: 'login',
			},
        ]
    }
]