import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCountSubject.asObservable();  // Observable para contar los elementos en el carrito

  constructor() {}

  // Método para agregar un producto al carrito
  addToCart(product: Product) {
    this.cart.push(product);

        // Imprimimos en consola para ver si el producto fue agregado correctamente
        
        console.log("Cantidad total en el carrito:", this.cart.length);

    this.cartItemCountSubject.next(this.cart.length);  // Actualiza el contador de productos
  }

  // Método para obtener los productos del carrito
  getCartItems(): Product[] {
    return this.cart;
  }
}
