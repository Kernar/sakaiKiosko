import { Injectable } from '@angular/core';
import {  environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

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

  // Agregar un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.Url}/products`, product);
  }

  // Actualizar un producto existente
  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.Url}/products/${product.id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.Url}/products/${id}`);
  }
  
}
