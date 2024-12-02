import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private Url: string = environment.baseUrl;


  //metodos CRUD para products

  //obtener todos los productos
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.Url}/products`);
  }

  //obtener un prodcuto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.Url}/products/${id}`);
  }

  // Agregar un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.Url}/products`, product);
  }

  // Actualizar un producto existente
  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.Url}/products/${product.id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.Url}/products/${id}`);
  }
  
}
