import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart/cart.service';// Ajusta la ruta según corresponda
import { Product } from '../../../../interfaces/product.interface'; // Modelo para los productos en el carrito
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../interfaces/cartItem.interface'
import { FormsModule } from '@angular/forms';
CartService

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);  // Cambiar item.precio a item.product.precio
  }

  // Método para eliminar un producto del carrito
  removeFromCart(product: CartItem): void {
    this.cartService.removeFromCart(product.id); // Eliminar producto pasando el id
    this.cartItems = this.cartService.getCartItems(); // Actualizar la lista de productos
  }

  updateQuantity(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1; // No permitir cantidad menor a 1
    }
    
    // Asegúrate de convertir 'item.inventoryStatus' a número
    const maxQuantity = Number(item.inventoryStatus); // o puedes usar: const maxQuantity = +item.inventoryStatus;
    
    if (item.quantity > maxQuantity) {
      item.quantity = maxQuantity; // No permitir cantidad mayor al stock disponible
    }
  
    this.cartService.updateCartItem(item); // Llama al servicio para actualizar el carrito
  }

  
}
