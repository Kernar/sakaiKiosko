import { CartItem } from "./cartItem.interface";
import { OrderItem } from "./orderItem.interface";

export interface Product {
  id: string;          // UUID
  name: string;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
  availableStock: number;
  createdAt: string;   // Fecha en formato string
  updatedAt: string;   // Fecha en formato string
  cartItems: CartItem[];   // Relación con los items del carrito
  orderItems: OrderItem[]; // Relación con los items de las órdenes
    inventoryStatus?: string;  // Propiedad opcional para el estado del inventario
  }
  