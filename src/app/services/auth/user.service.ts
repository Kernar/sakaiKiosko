import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  getUsers(): Observable<any> {
    return this._http.get(`${this.Url}/users`);
  }

  // Agregar un nuevo usuario
  addUser(email: any): Observable<any> {
    return this._http.post(`${this.Url}/users`, email);
  }

  // Actualizar un usuario existente
  updateUser(email: any): Observable<any> {
    return this._http.patch(`${this.Url}/users/${email.id}`, email);
  }

  // Eliminar un usuario
  deleteUser(id: any): Observable<any> {
    return this._http.delete(`${this.Url}/users/${id}`);
  }


/* 
  // Recuperación de contraseña
  recoverPassword(email: string): Observable<any> {
    return this._http.post<any>(`${this.Url}/recover-password`, { email });
  }*/
}
