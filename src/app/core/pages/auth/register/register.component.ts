import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/auth/user.service';
import { HttpClientModule } from '@angular/common/http';

interface LoginForm {
  email:FormControl<string>,
  password: FormControl<string>,
  username:FormControl<string>,
  firstName:FormControl<string>,
  lastName:FormControl<string>,
  phone:FormControl<string>,
  birthdate:FormControl<Date | null>
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {

  private _authService = inject(UserService);

  private _formBuilder =  inject(FormBuilder);

  form = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
    username: this._formBuilder.nonNullable.control('', Validators.required),
    firstName: this._formBuilder.nonNullable.control('', Validators.required),
    lastName: this._formBuilder.nonNullable.control('', Validators.required),
    phone: this._formBuilder.nonNullable.control('', Validators.required),
    birthdate: this._formBuilder.nonNullable.control<Date | null>(null, Validators.required),
  })

  constructor(){

  }
  submit(){
    if (this.form.invalid) return;

    const { email, password, username, firstName, lastName, phone, birthdate } = this.form.getRawValue();

    const formattedBirthdate = birthdate ? new Date(birthdate): null;
    
    this._authService.register(email,password,username, firstName, lastName, phone, formattedBirthdate).subscribe({
      next: (response) => console.log(response),
      error:(error) => console.log(error),
    });
  }


/*   firstName: string = '';
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
  } */
}
