import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketProductsComponent } from './market-products/market-products.component';
import { MarketMenubarComponent } from './market-menubar/market-menubar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { DetailProductsComponent } from './detail-products/detail-products.component';
import { AppLayoutModule } from '../../../layout/app.layout.module';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',

})
export class MarketComponent {

  
}
