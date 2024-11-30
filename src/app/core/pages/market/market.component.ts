import { Component } from '@angular/core';
import { AppLayoutModule } from '../../../layout/app.layout.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MarketProductsComponent } from './market-products/market-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-market',
  standalone: true,
  imports: [AppLayoutModule, CommonModule, ButtonModule, MenubarModule, MarketProductsComponent, MenubarModule, BrowserModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Productos',
        icon: 'pi pi-box',
        routerLink: '/productos'
      },
      {
        label: 'Ofertas',
        icon: 'pi pi-tags',
        routerLink: '/ofertas'
      },
      {
        label: 'Mi cuenta',
        icon: 'pi pi-user',
        routerLink: '/mi-cuenta'
      },
      {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        routerLink: '/carrito'
      }
    ];
  }
}
