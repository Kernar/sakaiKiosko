import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart/cart.service';// Ajusta la ruta según corresponda
import { Product } from '../../../../interfaces/product.interface'; // Modelo para los productos en el carrito
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../interfaces/cartItem.interface'
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/auth/user.service';
import { OrderService } from '../../../../services/order/order.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems: CartItem[] = []; // Cambiar Product[] a CartItem[]
  userId!: string; // El ID del usuario actual (falso o real)
  cartId!: string; // El ID del carrito asociado
  orderId!: string
  constructor(
    private cartService: CartService, 
    private userService:UserService,
    private orderService:OrderService
  ) {}

  downloadInvoice(orderId: string): void {
    this.orderService.downloadInvoice(orderId);
  }

  

  ngOnInit(): void {
    console.log('User ID:', this.userId);
    console.log('Cart ID:', this.cartId);
  // Obtener el userId (falso o real) del UserService
  this.userId = this.userService.getOrCreateGuestUserId();

  // Obtener o crear el carrito asociado
  this.cartService.getCartByUserId(this.userId).subscribe({
    next: (cart) => {
      this.cartId = cart.id; // Asigna el ID del carrito
      this.loadCartItems(); // Carga los ítems del carrito
    },
    error: (err) => {
      if (err.status === 404) {
        console.log('Carrito no encontrado. Creando uno nuevo...');
        this.cartService.createCart(this.userId).subscribe({
          next: (newCart) => {
            this.cartId = newCart.id;
            this.cartItems = []; // Inicializa vacío
          },
          error: (createErr) => console.error('Error al crear el carrito:', createErr),
        });
      } else {
        console.error('Error al cargar el carrito:', err);
      }
    },
  });
  }

  // Método para cargar los ítems del carrito
  private loadCartItems(): void {
    this.cartService.getCartItems(this.cartId).subscribe({
      next: (items) => {
        this.cartItems = items; // Asigna los ítems del carrito
        
      },
      error: (err) => {
        console.error('Error al cargar los ítems del carrito:', err);
      },
    });
  }

  //Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);  // Cambiar item.precio a item.product.precio
  }

  // Método para eliminar un producto del carrito
  removeFromCart(product: CartItem): void {
    
    this.cartService.removeFromCart(this.cartId, product.productId).subscribe({
      next: () => {
        console.log('Producto eliminado');
        // Actualizar la lista después de eliminar
        this.loadCartItems(); // Recargar la lista de productos
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      },
    });
  }

  updateQuantity(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1; // No permitir cantidad menor a 1
    }
    const maxQuantity = Number(item.product.inventoryStatus);
    if (item.quantity > maxQuantity) {
      item.quantity = maxQuantity; // No permitir cantidad mayor al stock disponible
    }  
    this.cartService.updateCartItem(this.cartId, item.productId, item.quantity).subscribe({
      next: () => {
        console.log('Cantidad actualizada');
      },
      error: (err) => {
        console.error('Error al actualizar la cantidad:', err);
      },
    });
  }
}
  

  

