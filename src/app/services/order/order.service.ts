import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  downloadInvoice(orderId: string): void {
    const url = `${environment.baseUrl}/orders/${orderId}/pdf`;
  
    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Abre en una nueva pestaña
    link.click();
  }
  
}
