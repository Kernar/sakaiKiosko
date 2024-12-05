import { Cart } from "./cart.interface";
import { Product } from "./product.interface";



export interface CartItem {
  id: string;            // UUID
  cartId: string;
  productId: string;
  quantity: number;
  currentPrice: number;  // Precio del producto al momento de agregarlo al carrito
  createdAt: string;
  updatedAt: string;
  cart: Cart;            // Relación con el carrito
  product: Product;      // Relación con el producto
}