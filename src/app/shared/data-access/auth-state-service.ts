import { inject, Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

interface Session {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    private  _storageService =inject(StorageService)

    logOut(){
        this._storageService.remove('session');
    }

    getSession(): Session | null {
        let currentSession: Session | null = null;
        const maybeSession = this._storageService.get<Session>('session');

        console.log('recuperando session: ',maybeSession);

        if (maybeSession !== null) {
            if (this._isValidSession(maybeSession)) {
                currentSession = maybeSession;
            } else {
                this.logOut();
            }
        }

        return currentSession;
    }

    private _isValidSession(maybeSession: unknown):boolean {
        return (
            
            typeof maybeSession === 'object' && 
            maybeSession !== null &&
            'access_token' in maybeSession
        ) ;


    }
}