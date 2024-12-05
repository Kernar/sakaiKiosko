import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../interfaces/cartItem.interface'
import { Cart } from '../../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];  // Ahora usas CartItem en lugar de solo Product
  private cartItemCountSubject = new BehaviorSubject<number>(0); // Contador de productos en el carrito

  cartItemCount$ = this.cartItemCountSubject.asObservable(); // Observable para contar los elementos en el carrito

  constructor() {}

  addProductToCart(product: Product, quantity: number) {
    // Verifica si el producto ya está en el carrito
    const existingItemIndex = this.cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex > -1) {
      // Si ya existe en el carrito, solo aumenta la cantidad
      this.cart[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, agrega el producto al carrito con la cantidad seleccionada
      const cartItem: CartItem = { 
        id: product.id,              // ID del producto
        cartId: 'someCartId',         // Necesitas definir un cartId válido
        productId: product.id,       // ID del producto
        quantity: quantity,          // Cantidad del producto
        currentPrice: product.price, // El precio actual del producto
        cart: {} as Cart,            // Relación con el carrito, necesitarás crear o definir un carrito
        product: product, 
       };  // Combina las propiedades de 'product' con 'quantity'
      this.cart.push(cartItem);
    }
  
    // Actualiza el contador de productos en el carrito
    this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0));
  
    console.log(this.cart);  // Verifica en consola el estado del carrito
  }
  

  // Método para obtener los productos del carrito
  getCartItems(): CartItem[] {
    return this.cart;
  }

  // Método para eliminar un producto del carrito
  removeFromCart(productId: string) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      this.cart.splice(itemIndex, 1);
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(productId: string) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1 && this.cart[itemIndex].quantity > 1) {
      this.cart[itemIndex].quantity -= 1;
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }

  // Método para vaciar el carrito
  clearCart() {
    this.cart = [];
    this.cartItemCountSubject.next(0); // Actualiza el contador a 0
  }

  updateQuantity(productId: string, quantity: number) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      this.cart[itemIndex].quantity = quantity;
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }

  updateCartItem(updatedItem: CartItem) {
    const itemIndex = this.cart.findIndex(item => item.id === updatedItem.id);
    if (itemIndex > -1) {
      this.cart[itemIndex] = updatedItem; // Reemplaza el ítem con los nuevos valores
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }
}
