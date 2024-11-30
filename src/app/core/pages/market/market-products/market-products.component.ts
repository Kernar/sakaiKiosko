import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './market-products.component.html',
  styleUrl: './market-products.component.css'
})
export class MarketProductsComponent {
  productos = [
    {
      nombre: 'Producto 1',
      marca: 'samsung',
      descripcion: 'Descripción del producto 1',
      precio: 100,
      imagenUrl: 'ruta-a-imagen-1.jpg'
      
    },
    {
      nombre: 'Producto 2',
      marca: 'samsung',
      descripcion: 'Descripción del producto 2',
      precio: 150,
      imagenUrl: 'ruta-a-imagen-2.jpg'
    },
    {
      nombre: 'Producto 3',
      marca: 'samsung',
      descripcion: 'Descripción del producto 3',
      precio: 200,
      imagenUrl: 'ruta-a-imagen-3.jpg'
    }
    // Agrega más productos según sea necesario
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
