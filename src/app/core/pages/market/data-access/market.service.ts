import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "../../../../../enviroments/enviroment";

interface User {
    id: string;
    email: string;
}

interface UserResponse {
    id: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})

export class marketService {
 private _http = inject(HttpClient);

 getUsers(): Observable<User[]>{
    return this._http.get<UserResponse[]>(`${environment.baseUrl}/auth/users`)
        .pipe(
            map((response) => {
                console.log(response)
                return response.map( (user): User => ({id:user.id, email: user.email}));
            }),
            
        );
 }
}