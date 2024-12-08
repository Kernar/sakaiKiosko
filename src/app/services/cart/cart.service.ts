import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CartItem } from '../../interfaces/cartItem.interface'
import { Cart } from '../../interfaces/cart.interface';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrlCarts = `${environment.baseUrl}/carts`; // Ruta base para carritos
  private baseUrlCartItems = `${environment.baseUrl}/cart-items`; // Ruta base para ítems del carrito
  private cart: CartItem[] = []; // Almacén temporal del carrito en memoria

  private cartItemCountSubject = new BehaviorSubject<number>(0); // Contador de productos en el carrito
  cartItemCount$ = this.cartItemCountSubject.asObservable(); // Observable para contar los elementos en el carrito

  constructor(private http: HttpClient, private userService: UserService) {}

  // Obtener o crear un carrito para el usuario actual (guestUser o realUser)
loadOrCreateCart(): Observable<Cart> {
  const userId = this.userService.getOrCreateGuestUserId(); // Obtiene el ID de usuario actual (invitado o real)
  return this.getCartByUserId(userId).pipe(
    catchError((err) => {
      if (err.status === 404) {
        // Si el carrito no existe, lo crea
        return this.createCart(userId);
      } else {
        // Si ocurre otro error, propaga el error
        return throwError(() => new Error('Error cargando o creando el carrito'));
      }
    }),
    tap((cart) => {
      console.log('Carrito cargado o creado:', cart);
    })
  );
}

  // Obtener el carrito de un usuario
  getCartByUserId(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrlCarts}/user/${userId}`);
  }

  // Crear un carrito para un usuario
  createCart(userId: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrlCarts}/user/${userId}`, {}).pipe(
      tap((cart) => {
        console.log('Nuevo carrito creado:', cart);
      })
    );
  }

  // Obtener los ítems del carrito
  getCartItems(cartId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrlCartItems}/${cartId}`).pipe(
      tap((items) => {
        this.cart = items; // Sincroniza con el almacenamiento en memoria
        const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
        this.cartItemCountSubject.next(totalCount); // Actualiza el contador
      })
    );
  }

  // Agregar un producto al carrito
  addProductToCart(cartId: string, product: Product, quantity: number): Observable<CartItem> {
    const existingItem = this.cart.find((item) => item.productId === product.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      return this.updateCartItem(cartId, existingItem.productId, existingItem.quantity + quantity);
    } else {
      // Si el producto no está, agrégalo
      return this.http.post<CartItem>(`${this.baseUrlCartItems}/${cartId}`, {
        productId: product.id,
        quantity,
      }).pipe(
        tap((newItem) => {
          this.cart.push(newItem);
          this.updateCartItemCount(); // Actualiza el contador
        })
      );
    }
  }

  // Actualizar la cantidad de un producto
  updateCartItem(cartId: string, productId: string, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.baseUrlCartItems}/${cartId}/${productId}`, { quantity }).pipe(
      tap(() => {
        const itemIndex = this.cart.findIndex((item) => item.productId === productId);
        if (itemIndex > -1) {
          this.cart[itemIndex].quantity = quantity; // Actualiza la cantidad en memoria
          this.updateCartItemCount(); // Actualiza el contador
        }
      })
    );
  }

  // Eliminar un producto del carrito
  removeFromCart(cartId: string, productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlCartItems}/${cartId}/${productId}`).pipe(
      tap(() => {
        this.cart = this.cart.filter((item) => item.productId !== productId); // Elimina en memoria
        this.updateCartItemCount(); // Actualiza el contador
      })
    );
  }

  getOrCreateCart(): void {
    const userId = this.userService.getOrCreateGuestUserId(); // Obtén el userId falso
    this.getCartByUserId(userId).subscribe({
      next: (cart) => {
        console.log('Cart Found:', cart);
      },
      error: (err) => {
        if (err.status === 404) {
          this.createCart(userId).subscribe((newCart) => {
            console.log('New Cart Created:', newCart);
          });
        }
      },
    });
  }

  // Vaciar el carrito
  clearCart(): void {
    this.cart = [];
    this.cartItemCountSubject.next(0); // Actualiza el contador
  }


  migrateCartToRealUser(realUserId: string): void {
    const guestUserId = this.userService.getOrCreateGuestUserId();
    this.http.post(`${this.baseUrlCarts}/migrate`, { guestUserId, realUserId }).subscribe({
      next: () => {
        this.userService.updateToRealUser(realUserId); // Actualiza al usuario real
        console.log('Cart migrated to real user');
      },
      error: (err) => console.error('Error migrating cart:', err),
    });
  }
  

  // Actualizar el contador de productos en el carrito
  private updateCartItemCount(): void {
    const totalCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartItemCountSubject.next(totalCount);
  }


  //esto de abajo es codigo antiguo pero esta implementado en otras partes del codigo

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(productId: string) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1 && this.cart[itemIndex].quantity > 1) {
      this.cart[itemIndex].quantity -= 1;
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }

  // Método para aumentar la cantidad de un producto
  updateQuantity(productId: string, quantity: number) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      this.cart[itemIndex].quantity = quantity;
      this.cartItemCountSubject.next(this.cart.reduce((acc, item) => acc + item.quantity, 0)); // Actualiza el contador
    }
  }



}
