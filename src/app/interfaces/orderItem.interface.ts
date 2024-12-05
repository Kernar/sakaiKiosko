import { Order } from "./order.interface";
import { Product } from "./product.interface";

export interface OrderItem {
    id: string;           // UUID
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;    // Precio unitario del producto al momento de la compra
    order: Order;         // Relación con la orden
    product: Product;     // Relación con el producto
  }
  