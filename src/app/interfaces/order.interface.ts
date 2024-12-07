import { OrderItem } from "./orderItem.interface";
//import { User } from "./user.inteface";

export interface Order {
    id: string;           // UUID
    userId: string;       // ID del usuario
    total: number;        // Total de la orden
    status: string;       // Estado de la orden (ej. "pendiente", "completado", "cancelado")
    //user: User;           // Relación con el usuario
    items: OrderItem[];   // Relación con los items de la orden
  }
  