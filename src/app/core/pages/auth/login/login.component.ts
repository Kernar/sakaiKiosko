import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/auth/user.service';
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

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Función que se llama cuando el formulario se envía
  onSubmit(): void {
    this.submitted = true; // Marca el formulario como enviado

    // Si el formulario es válido
    if (this.username && this.password) {
      // Llamamos al servicio de login
      this.userService.login(this.username, this.password).subscribe(
        (response) => {
          // Aquí recibimos la respuesta de login exitoso
          console.log('Login exitoso:', response);

          // Muestra un mensaje de éxito usando el MessageService
          this.messageService.add({
            severity: 'success',
            summary: 'Login Exitoso',
            detail: 'Bienvenido, ' + this.username + '!'
          });

          // Redirigimos al usuario a la página por defecto (por ejemplo, 'dashboard')
          this.router.navigate(['/market']); // Asegúrate de tener la ruta '/dashboard' definida
        },
        (error) => {
          // Manejo de errores, si el login falla
          console.error('Error en el login:', error);

          // Muestra un mensaje de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error en el Login',
            detail: 'Usuario o contraseña incorrectos.'
          });
        }
      );
    } else {
      // Si los campos no están completos, mostrar un mensaje de advertencia
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, ingrese su usuario y contraseña.'
      });
    }
  }
  


}
