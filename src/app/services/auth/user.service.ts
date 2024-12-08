import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../shared/data-access/storage.service';
import { v4 as uuidv4 } from 'uuid'; // Instala 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http = inject(HttpClient)
  private userIdKey = 'guestUser';
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
    return this._http.get(`${this.Url}/auth/users`);
  }

  // Agregar un nuevo usuario
  addUser(email: any): Observable<any> {
    return this._http.post(`${this.Url}/auth/users`, email);
  }

  // Actualizar un usuario existente
  updateUser(email: any): Observable<any> {
    return this._http.patch(`${this.Url}/auth/users/${email.id}`, email);
  }

  // Eliminar un usuario
  deleteUser(id: any): Observable<any> {
    return this._http.delete(`${this.Url}/auth/users/${id}`);
  }
  

  //usuario falso si no estas logeado
  getOrCreateGuestUserId(): string {
    let userId = localStorage.getItem(this.userIdKey);
    if (!userId) {
      userId = uuidv4(); // Genera un identificador único
      localStorage.setItem(this.userIdKey, userId);
    }
    return userId;
  }

    // Actualizar el userId al real después de iniciar sesión
  updateToRealUser(realUserId: string): void {
    localStorage.setItem(this.userIdKey, realUserId); // Reemplaza el guestUserId con el realUserId
  }


/* 
  // Recuperación de contraseña
  recoverPassword(email: string): Observable<any> {
    return this._http.post<any>(`${this.Url}/recover-password`, { email });
  }*/
}
