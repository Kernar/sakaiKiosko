import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../../interfaces/user.inteface';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { HttpClient } from '@angular/common/http';
import { AppLayoutModule } from '../../../../layout/app.layout.module';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppLayoutModule ,CommonModule, FormsModule, ButtonModule, ToastModule, TableModule, ToolbarModule, DialogModule, DropdownModule, CalendarModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [
    HttpClient, UserService, MessageService
  ]
})
export class UsersComponent {

  userDialog: boolean = false;
  deleteUserDialog: boolean = false;
  user!: User;
  users: User[] = [];
  submitted: boolean = false;
  rowsPerPageOptions: number[] = [5, 10, 20]; // Paginación

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  openNew() {
    this.user = {} as User;
    this.submitted = false;
    this.userDialog = true; // Abrir el modal de usuario
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario borrado',
        detail: 'Usuario ' + this.user.firstName + ' ' + this.user.lastName + ' borrado satisfactoriamente'
      });
      this.getUsers();
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe((data) => {
        this.user = data;
        this.getUsers();
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario actualizado',
          detail: 'Usuario ' + this.user.firstName + ' ' + this.user.lastName + ' actualizado satisfactoriamente'
        });
      });
    } else {
      this.userService.addUser(this.user).subscribe((data) => {
        this.user = data;
        this.getUsers();
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario creado',
          detail: 'Usuario ' + this.user.firstName + ' ' + this.user.lastName + ' creado satisfactoriamente'
        });
      });
    }

    this.userDialog = false;
  }
  roles: { label: string, value: string }[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' }
  ];
  

}
