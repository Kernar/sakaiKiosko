import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/auth/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../../services/product/product.service';

interface LoginForm {
  email:FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule, DialogModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpClient, UserService, MessageService
  ]
})
export class LoginComponent {

  passwordVisible: boolean = false;

  private _formBuiler = inject(FormBuilder);
  private _authService = inject(UserService);
  private _router = inject(Router);
  private _messageService = inject(MessageService);

  form = this._formBuiler.group<LoginForm>({
    email: this._formBuiler.nonNullable.control('',[
      Validators.required,
      Validators.email
    ]),
    password: this._formBuiler.nonNullable.control('',Validators.required),
  })

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  submit(){
    if (this.form.invalid) return ;
    const {email, password} = this.form.getRawValue();
    this._authService.login(email, password). subscribe({
      next: (response) => {
        this._router.navigateByUrl('/market');
      },
      error: (error) => {
        console.log(error)
      // Mostramos el mensaje de error en la pantalla
      this._messageService.add({
        severity: 'error',
        summary: 'Error en el Login',
        detail: 'Usuario o contraseña incorrectos.',
      })
    }
  });
  }}
