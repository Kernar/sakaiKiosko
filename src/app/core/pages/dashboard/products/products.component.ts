import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../interfaces/product.interface';
import { ProductService } from '../../../../services/product/product.service';
import { MessageService, SharedModule } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AppLayoutModule } from '../../../../layout/app.layout.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ SharedModule, CommonModule, FormsModule, ButtonModule, ToastModule, TableModule, ToolbarModule, DialogModule, AppLayoutModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [
    HttpClient, ProductService, MessageService
  ]
})
export class ProductsComponent implements OnInit {

  productDialog: boolean= false;
  deleteProductDialog: boolean = false;
  product!: Product;
  products:Product[]=[];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5,10,20]; //paginacion
  
  constructor(private productService:ProductService, private messageService: MessageService) {
    //mensaje para declarle al usuario que todo ah salido bien
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  openNew() {//abre un modal para poder agregar un nuevo producto
    this.product = {} as Product;
    this.submitted = false;
    this.productDialog = true; //identificador del modal
  }

  editProduct(product:Product){ //para editar productos
    this.product = { ...product }
    this.productDialog = true;
  }

  deleteProduct(product:Product){//abre el modal de eliminar
    this.deleteProductDialog = true;
    this.product = { ...product }
  }

  confirmDelete() {//al confimar el delte se activa el modal de confirmacion de eliminacion
    this.deleteProductDialog = false;
    this.productService.deleteProduct(this.product.id).subscribe((data)=> {
      this.messageService.add({severity:'success | confirmado', summary:'Producto borrado', 
        detail: 'Producto '+this.product.nombre+' borrado satisfactoriamente'})
    });
    this.getProducts();
  }

  hideDialog(){
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(){
    this.submitted = true;

    if(this.product.id){
      this.productService.updateProduct(this.product).subscribe((data)=> {
        this.product = data;
        this.getProducts();
        this.messageService.add({severity:'success | confirmado', summary:'Producto actualizado', 
          detail: 'Producto '+this.product.nombre+' actualizado satisfactoriamente'})
      })
    } else {
      this.productService.addProduct(this.product).subscribe((data)=>{
        this.product = data;
        this.getProducts();
        this.messageService.add({severity:'success | confirmado', summary:'Producto creado', 
          detail: 'Producto '+this.product.nombre+' creado satisfactoriamente'})
      })
    }
    
    this.productDialog = false;

  }
}
