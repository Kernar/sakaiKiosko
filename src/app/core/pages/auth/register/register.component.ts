import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/auth/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface RegisterForm {
  email:FormControl<string>,
  password: FormControl<string>,
  confirmPassword: FormControl<string>,
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
  providers: [UserService, MessageService]
  
})
export class RegisterComponent {

  private _authService = inject(UserService);
  private _formBuilder =  inject(FormBuilder);
  private _router = inject(Router);
  private messageService = inject(MessageService);

  form = this._formBuilder.group<RegisterForm>({
    email: this._formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
    username: this._formBuilder.nonNullable.control('', Validators.required),
    firstName: this._formBuilder.nonNullable.control('', Validators.required),
    lastName: this._formBuilder.nonNullable.control('', Validators.required),
    phone: this._formBuilder.nonNullable.control('', Validators.required),
    birthdate: this._formBuilder.nonNullable.control<Date | null>(null, Validators.required),
    confirmPassword: this._formBuilder.nonNullable.control('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

  constructor(){

  }
  submit(){
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }     
      
    const { email, password, username, firstName, lastName, phone, birthdate } = this.form.getRawValue();
    const formattedBirthdate = birthdate ? new Date(birthdate): null;
    this._authService.register(email,password,username, firstName, lastName, phone, formattedBirthdate).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/market');
      },
      error:(error) => console.log('error en el registro: ',error),
    });
  }

  passwordMatchValidator(group: any) {
    const { password, confirmPassword } = group.controls;
    return password && confirmPassword && password.value === confirmPassword.value
    ? null : { passwordMismatch: true };
  }

}
