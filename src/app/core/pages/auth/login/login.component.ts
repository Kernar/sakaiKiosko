import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/user/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule, DialogModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpClient, UserService, MessageService
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;  // Para alternar la visibilidad de la contraseña
  rememberMe: boolean = false;       // Para el checkbox de "Recuerdame"
  submitted: boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService,  // Inyectamos el servicio UserService
    private messageService: MessageService  // Inyectamos el servicio de mensajes
  ) {}

  // Función que se llama cuando el formulario se envía
  onSubmit() {
    this.submitted = true;
  
    if (this.username && this.password) {
      // Llamamos al servicio de login
      this.userService.login(this.username, this.password).subscribe({
        next: (response) => {
          // Suponiendo que el backend retorna un objeto con un token
          if (response?.token) {
            // Almacenar el token en localStorage o sessionStorage según el caso
            localStorage.setItem('auth_token', response.token);
  
            // Mostrar mensaje de éxito
            this.messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: `Welcome, ${this.username}!`,
            });
  
            // Redirigir al dashboard o página principal
            this.router.navigate(['/dashboard']);
          } else {
            // Mostrar mensaje de error si no hay token
            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: 'Invalid username or password.',
            });
          }
        },
        error: (err) => {
          // Manejo de errores en caso de fallos en la conexión o el backend
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'An error occurred during login. Please try again later.',
          });
          console.error('Error during login:', err);
        }
      });
    }
  }
  

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
