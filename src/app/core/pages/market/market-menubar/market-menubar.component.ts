import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-market-menubar',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenubarModule, FormsModule],
  templateUrl: './market-menubar.component.html',
  styleUrl: './market-menubar.component.css'
})
export class MarketMenubarComponent {
  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  searchTerm: string = '';
  menuItems = [
    {
      label: 'clientes',
      icon: 'pi pi-table',
      url: '/customers',
      isOpen: false,  // Agregar estado para saber si está abierto o cerrado
      subMenu: [
        { label: 'New', icon: 'pi pi-plus', url: '/customers/new' },
        { label: 'Duplicate', icon: 'pi pi-copy', url: '/customers/duplicate' }
      ]
    },
    {
      label: 'Orders',
      icon: 'pi pi-list',
      url: '/orders',
      isOpen: false,  // Estado para Orders
    },
    {
      label: 'Shipments',
      icon: 'pi pi-cart-minus',
      url: '/shipments',
      isOpen: false,  // Estado para Shipments
    },
    {
      label: 'Messages',
      icon: 'pi pi-comment',
      url: '/messages',
      isOpen: false,  // Estado para Messages
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      url: '/profile',
      isOpen: false,  // Estado para Profile
    },
    {
      label: 'deslogearte',
      icon: 'pi pi-sign-out',
      url: '/logout',
      isOpen: false,  // Estado para Logout
    }
  ];
  
  toggleSubMenu(item: any) {
    // Toggle del estado del submenú, si ya está abierto lo cierra
    item.isOpen = !item.isOpen;
  }

  gleSubMenu(item: any) {
    item.isOpen = !item.isOpen;
  }

  // Método que se llama cuando cambia el texto de búsqueda
  onSearchChange() {
    console.log('Buscando: ', this.searchTerm);
    // Lógica de búsqueda aquí, como filtrar items, enviar consulta a la API, etc.
  }
}
