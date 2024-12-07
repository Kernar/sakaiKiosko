import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.inteface'; // Asegúrate de importar la interfaz de usuario
import { environment } from '../../../enviroments/enviroment';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../shared/data-access/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http = inject(HttpClient)

  private Url: string = environment.baseUrl;
  private _storage = inject(StorageService);

  register(email: string, password: string, username: string, 
    firstName: string, lastName: string, phone: string, birthdate: Date|null ):Observable<any>{
    return this._http.post(`${this.Url}/auth/register`, {
      email, password, username, firstName, lastName, phone, birthdate 
    })
    .pipe(tap((response) => {
      this._storage.set('session', JSON.stringify(response));
      
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post(`${this.Url}/auth/login`, { 
      email, password 
    })
    .pipe(tap((response) => {
        this._storage.set('session', JSON.stringify(Response))
      })
    )
  }

  // Métodos CRUD para usuarios

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this.Url}/users`);
  }

  // Agregar un nuevo usuario
  addUser(user: User): Observable<User> {
    return this._http.post<User>(`${this.Url}/users`, user);
  }

  // Actualizar un usuario existente
  updateUser(user: User): Observable<User> {
    return this._http.patch<User>(`${this.Url}/users/${user.id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<User> {
    return this._http.delete<User>(`${this.Url}/users/${id}`);
  }

    // Métodos adicionales para login, registro y recuperación de contraseña

  // Login de usuario
/*   login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.Url}/users`, { username, password });
  }

  // Registro de usuario
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.Url}/register`, user);
  } 

  // Recuperación de contraseña
  recoverPassword(email: string): Observable<any> {
    return this._http.post<any>(`${this.Url}/recover-password`, { email });
  }*/
}
