export interface Product {
    id: string;
    nombre: string;
    imagen: string;
    precio: number;
    marca: string;
    descripcion: string;
    cantidad: number;
    inventoryStatus?: string;  // Propiedad opcional para el estado del inventario
  }
  