import { Product } from "./product.interface";

export interface CartItem extends Product {
  quantity: number;  // La propiedad quantity está presente en CartItem, no hace falta 'product'
}
