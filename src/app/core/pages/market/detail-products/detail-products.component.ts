import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AppLayoutModule } from '../../../../layout/app.layout.module';
@Component({
  selector: 'app-detail-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css',
  providers: [HttpClient, ProductService, MessageService]

})
export class DetailProductsComponent implements OnInit {
  productId!: number; 
  product: Product | null = null; // Esto almacenará los detalles del producto

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}


  ngOnInit(): void {
    // Capturamos el parámetro 'id' de la URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Verificamos que tenemos un id válido
    if (this.productId) {
      // Llamamos al servicio para obtener el producto correspondiente
      this.productService.getProductById(this.productId).subscribe(product => {
        console.log(product);
        // Aquí puedes manejar el producto obtenido
      });
    }
  }
}
