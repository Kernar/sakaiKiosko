import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';

import { AppLayoutModule } from '../../../layout/app.layout.module';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppLayoutModule, FooterComponent, UsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 
}
