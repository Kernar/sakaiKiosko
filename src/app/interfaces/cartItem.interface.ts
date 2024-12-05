import { Cart } from "./cart.interface";
import { Product } from "./product.interface";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  currentPrice: number;

  cart: Cart;        // Relación con el carrito
  product: Product;  // Relación con el producto
}
