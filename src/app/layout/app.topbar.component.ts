import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',

    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    // Objeto para controlar si los submenús están abiertos o cerrados
    isSubmenuOpen:  { [key: string]: boolean }  = {
        perfil: false,
        config: false
    };

    // Término de búsqueda
    searchTerm: string = '';

    // Referencias a los elementos del DOM
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

        // Método para alternar el estado de los submenús
        toggleSubmenu(menu: 'perfil' | 'config') {
            this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu];
        }
    
    onSearchChange() {
        console.log('Buscando: ', this.searchTerm);
        // Lógica de búsqueda aquí, como filtrar items, enviar consulta a la API, etc.
      }



    
}
