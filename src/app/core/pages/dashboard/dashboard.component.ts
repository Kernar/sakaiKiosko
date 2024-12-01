import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ProductsComponent } from './products/products.component';
import { AppLayoutModule } from '../../../layout/app.layout.module';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, ProductsComponent, AppLayoutModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 
}
