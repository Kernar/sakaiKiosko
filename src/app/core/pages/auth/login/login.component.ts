import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;  // Para alternar la visibilidad de la contraseña
  rememberMe: boolean = false;       // Para el checkbox de "Recuerdame"
  submitted: boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  onSubmit() {
    this.submitted = true;

    if (this.username && this.password) {
      // Simulación de autenticación
      if (this.username === 'admin' && this.password === 'admin') {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Welcome, ${this.username}!`,
        });
        // Redirige al dashboard o a la página principal
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid username or password.',
        });
      }
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
