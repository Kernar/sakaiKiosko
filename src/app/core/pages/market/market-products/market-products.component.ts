import { CommonModule } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [ CommonModule, PaginatorModule, InputTextModule, DataViewModule, ButtonModule, TagModule],
  templateUrl: './market-products.component.html',
  styleUrl: './market-products.component.css'
  
})
export class MarketProductsComponent {
  productos = [
    { nombre: 'Producto 1', marca: 'samsung', descripcion: 'Descripción del producto 1', precio: 100, imagenUrl: 'assets/img/sus.jpg', inventoryStatus: 'INSTOCK' },
    { nombre: 'Producto 2', marca: 'samsung', descripcion: 'Descripción del producto 2', precio: 150, imagenUrl: 'assets/img/sus.jpg', inventoryStatus: 'OUTOFSTOCK' },
    { nombre: 'Producto 3', marca: 'samsung', descripcion: 'Descripción del producto 3', precio: 200, imagenUrl: 'assets/img/sus.jpg', inventoryStatus: 'INSTOCK' }
  ]; 
  
  
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.productos);
   }

  onSearchChange() {
    // Lógica para filtrar los productos según el término de búsqueda
    console.log(this.searchTerm);
  }

  // Asegura que 'getSeverity' retorna un valor de tipo "success" | "secondary" | "info" | "warning" | "danger" | "contrast"
  getSeverity(item: any): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" {
    if (item.inventoryStatus === 'INSTOCK') {
      return 'success';
    } else if (item.inventoryStatus === 'OUTOFSTOCK') {
      return 'danger';
    }
    return 'info';  // Si no está ni en "INSTOCK" ni en "OUTOFSTOCK", por defecto será 'info'
  }
  
  
}
