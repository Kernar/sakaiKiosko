import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MarketProductsComponent } from './market-products/market-products.component';
import { MarketMenubarComponent } from './market-menubar/market-menubar.component';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, MarketProductsComponent, MarketMenubarComponent],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent {

  
}
