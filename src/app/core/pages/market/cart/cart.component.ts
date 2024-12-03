import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart/cart.service';// Ajusta la ruta según corresponda
import { Product } from '../../../../interfaces/product.interface'; // Modelo para los productos en el carrito
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../interfaces/cartItem.interface'
CartService

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = []; // Cambiar Product[] a CartItem[]

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Obtener los productos del carrito desde el servicio
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);  // Cambiar item.precio a item.product.precio
  }

  // Método para eliminar un producto del carrito
  removeFromCart(product: CartItem): void {
    this.cartService.removeFromCart(product.id); // Eliminar producto pasando el id
    this.cartItems = this.cartService.getCartItems(); // Actualizar la lista de productos
  }
}
