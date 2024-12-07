import { CartItem } from "./cartItem.interface";
//import { User } from "./user.inteface";

export interface Cart {
    id: string;         // UUID
    userId: string;     // ID del usuario
    isActive: boolean;  // Indica si el carrito está activo
    //user: User;         // Relación con el usuario
    items: CartItem[];  // Relación con los items en el carrito
  }
  