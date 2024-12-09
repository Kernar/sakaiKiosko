import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['market'] }
                ]
            },
            {
                label: 'Administracion',
                items: [
                    { label: 'Productos', icon: 'pi pi-fw pi-id-card', routerLink: ['/administracion/products'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-check-square', routerLink: ['/administracion/users'] },
                    { label: 'Dashboard', icon: 'pi pi-fw pi-check-square', routerLink: ['/administracion/grafics'] },
                ]
            },
            {
                label: 'Logeo',
                items: [
                    { label: 'Login', icon: 'pi pi-fw pi-id-card', routerLink: ['/auth/login'] },
                    { label: 'Register', icon: 'pi pi-fw pi-check-square', routerLink: ['/auth/register'] },
                    { label: 'Recover', icon: 'pi pi-fw pi-check-square', routerLink: ['/auth/forgot-password'] },
                ]
            },

            
            
        ];
    }
}
