import { Component } from '@angular/core';
import { AppLayoutModule } from '../../../../layout/app.layout.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AppLayoutModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
