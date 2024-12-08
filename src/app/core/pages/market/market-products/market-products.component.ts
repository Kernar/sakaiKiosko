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
import { CartItem } from '../../../../interfaces/cartItem.interface'

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

  quantity: number = 1;
  productos: Product[] = [];  // Aquí almacenaremos los productos
  cartId: string | null = null; // Almacena el ID del carrito actual

  constructor(
    private productService: ProductService,
    private router: Router,  // Inyectamos Router para manejar la navegación
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productos = data.map(product => {
        // Agregar dinámicamente inventoryStatus
        product['inventoryStatus'] = product.availableStock > 0 ? 'IN STOCK' : 'OUTOFSTOCK';
        return product;
      });
    });
      // Obtener o crear el carrito
      this.loadOrCreateCart();
  }

  getSeverity(product: Product): "success" | "danger" {
    // Mapear 'IN STOCK' a 'success' y 'OUTOFSTOCK' a 'danger'
    return product.inventoryStatus === 'IN STOCK' ? 'success' : 'danger';
  }

  // Método para redirigir a la página de detalles del producto
  goToProductDetail(id: string): void {
    // Navegar a la ruta detail-product/:id
    this.router.navigate([`market/detail-product/${id}`]);
  }

  // Método para agregar el producto al carrito con la cantidad seleccionada
  addToCart(product: Product, quantity: number) {
    if (product.availableStock < 1) {
      console.error('Producto no disponible.');
      return;
    }

    if (!this.cartId) {
      console.error('No se pudo encontrar o crear un carrito.');
      return;
    }

    this.cartService.addProductToCart(this.cartId, product, quantity).subscribe({
      next: () => console.log(`Producto ${product.name} agregado al carrito.`),
      error: (err) => console.error('Error al agregar el producto al carrito:', err),
    });
  }

  private loadOrCreateCart(): void {
    this.cartService.loadOrCreateCart().subscribe({
      next: (cart) => {
        this.cartId = cart.id; // Almacenar el ID del carrito actual
        console.log('Carrito cargado o creado:', cart);
      },
      error: (err) => console.error('Error al cargar o crear el carrito:', err),
    });
  }
  
}
