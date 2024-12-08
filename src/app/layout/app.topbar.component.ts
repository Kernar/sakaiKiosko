import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CartService } from '../services/cart/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-topbar',

    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    cartItemCount: number = 0;
    showMenuIcons: boolean = false; // Controlará la visibilidad de los íconos del menú
    isSubmenuOpen: { [key: string]: boolean } = {
      perfil: false,
      config: false
    };
  
    searchTerm: string = '';  // Término de búsqueda
  
    // Referencias a los elementos del DOM
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
  
    constructor(
      public layoutService: LayoutService,
      private cartService: CartService,
      private router: Router  // Importamos el router para obtener la ruta actual
    ) { }
  
    ngOnInit() {
    // Detecta los cambios de la ruta activa
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Verifica si la ruta activa es una subruta de 'administracion'
        const currentRoute = this.router.url;
        this.showMenuIcons = currentRoute.startsWith('/administracion');
      });
  
      // Suscríbete al contador de productos en el carrito
      this.cartService.cartItemCount$.subscribe((count) => {
        this.cartItemCount = count;
        //console.log("Contador del carrito actualizado:", this.cartItemCount);
      });
    }
  
  
    // Método para alternar el estado de los submenús
    toggleSubmenu(menu: 'perfil' | 'config') {
      this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu];
    }
  
    // Método de búsqueda (si aplica)
    onSearchChange() {
      console.log('Buscando: ', this.searchTerm);
      // Lógica de búsqueda aquí, como filtrar items, enviar consulta a la API, etc.
    }

    
}
