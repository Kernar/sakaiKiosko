import { CommonModule } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../../../interfaces/product.interface';
import { ProductService } from '../../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [ CommonModule, PaginatorModule, InputTextModule, DataViewModule, ButtonModule, TagModule],
  templateUrl: './market-products.component.html',
  styleUrl: './market-products.component.css',
  providers: [
    HttpClient, ProductService, MessageService
  ]
  
})
export class MarketProductsComponent {

  productos: Product[] = [];  // Aquí almacenaremos los productos

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productos = data.map(product => {
        // Agregar dinámicamente inventoryStatus
        product['inventoryStatus'] = product.cantidad > 0 ? 'IN STOCK' : 'OUTOFSTOCK';
        return product;
      });
    });
  }

  getSeverity(product: Product): "success" | "danger" {
    // Mapear 'IN STOCK' a 'success' y 'OUTOFSTOCK' a 'danger'
    return product.inventoryStatus === 'IN STOCK' ? 'success' : 'danger';
  }
  
  
}
