import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.inteface'; // Asegúrate de importar la interfaz de usuario
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private Url: string = environment.baseUrl;

  // Métodos CRUD para usuarios

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.Url}/users`);
  }

  // Agregar un nuevo usuario
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.Url}/users`, user);
  }

  // Actualizar un usuario existente
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.Url}/users/${user.id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.Url}/users/${id}`);
  }

    // Métodos adicionales para login, registro y recuperación de contraseña

  // Login de usuario
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.Url}http://localhost:3000/users`, { username, password });
  }

  // Registro de usuario
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.Url}/register`, user);
  }

  // Recuperación de contraseña
  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.Url}/recover-password`, { email });
  }
}
