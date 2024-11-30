import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;

  constructor() {}

  // Método para manejar el submit del formulario
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Aquí iría el proceso para enviar el formulario, como llamar a un servicio API
    console.log('Form submitted successfully!', this.firstName, this.lastName, this.dob, this.email, this.phone, this.username, this.password);

    // Podrías mostrar un mensaje de éxito o redirigir al usuario después del registro
    alert('Registration successful!');
    form.reset();  // Resetea el formulario después de enviarlo
  }

  // Método para verificar si las contraseñas coinciden
  get passwordMismatch() {
    return this.password && this.confirmPassword && this.password !== this.confirmPassword;
  }
}
