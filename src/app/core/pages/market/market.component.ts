import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketProductsComponent } from './market-products/market-products.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',

})
export class MarketComponent {

  
}
