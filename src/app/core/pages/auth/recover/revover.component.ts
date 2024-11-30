import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-revover',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './revover.component.html',
  styleUrl: './revover.component.css'
})
export class RevoverComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Método para manejar el submit del formulario
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Aquí iría el proceso para recuperar la contraseña, como llamar a un servicio API
    console.log('Formulario enviado con éxito', this.email, this.newPassword);

    // Puedes mostrar un mensaje de éxito o redirigir al usuario después de la recuperación
    alert('Recuperación exitosa, se ha enviado un correo con las instrucciones.');
    form.reset();  // Resetea el formulario después de enviarlo
  }

  // Método para verificar si las contraseñas coinciden
  get passwordMismatch() {
    return this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword;
  }
}
