import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import {  RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ HttpClientModule, RouterOutlet, SidebarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 
}
