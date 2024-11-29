import { Component } from '@angular/core';
import { AppLayoutModule } from '../../../layout/app.layout.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [AppLayoutModule, CommonModule, ButtonModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent {

}
