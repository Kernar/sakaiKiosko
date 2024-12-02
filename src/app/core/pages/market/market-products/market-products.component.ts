import { CommonModule } from '@angular/common';
import { Component, Input, OnInit,  } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../../../interfaces/product.interface';
import { ProductService } from '../../../../services/product/product.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';


@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [ CommonModule, PaginatorModule, InputTextModule, DataViewModule, ButtonModule, TagModule, RouterLink],
  templateUrl: './market-products.component.html',
  styleUrl: './market-products.component.css',
  providers: [
    HttpClient, ProductService, MessageService
  ]
  
})
export class MarketProductsComponent {

  @Input() product!: Product;
  productos: Product[] = [];  // Aquí almacenaremos los productos

  constructor(
    private productService: ProductService,
    private router: Router,  // Inyectamos Router para manejar la navegación
    private cartService: CartService
  ) { }

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

    // Método para redirigir a la página de detalles del producto
    goToProductDetail(id: number): void {
      // Navegar a la ruta detail-product/:id
      this.router.navigate([`/detail-product/${id}`]);
    }

      // Método para agregar el producto al carrito
  addToCart(product: Product){
    console.log("Producto seleccionado:", product);
    this.cartService.addToCart(product);
  }
  
}
