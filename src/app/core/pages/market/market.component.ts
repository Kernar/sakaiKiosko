import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',

})
export class MarketComponent {

  
}
