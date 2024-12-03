import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../interfaces/cartItem.interface'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];  // Ahora usas CartItem en lugar de solo Product
  private cartItemCountSubject = new BehaviorSubject<number>(0); // Contador de productos en el carrito

  cartItemCount$ = this.cartItemCountSubject.asObservable(); // Observable para contar los elementos en el carrito

  constructor() {}

  addToCart(product: Product, quantity: number) {
    // Verifica si el producto ya está en el carrito
    const existingItemIndex = this.cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex > -1) {
      // Si ya existe en el carrito, solo aumenta la cantidad
      this.cart[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, agrega el producto al carrito con la cantidad seleccionada
      const cartItem: CartItem = { ...product, quantity };  // Aquí combinamos las propiedades de 'product' con 'quantity'
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
  removeFromCart(productId: number) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      this.cart.splice(itemIndex, 1);
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(productId: number) {
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
}
