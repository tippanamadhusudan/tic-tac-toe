import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class LoginOrSignupService {
    expiTimer: any;

    constructor(private http: HttpClient,
        private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_aRGXrihylyZit_fYKcc6WMEObdWJtKs',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_aRGXrihylyZit_fYKcc6WMEObdWJtKs', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
        tap(res => {
            localStorage.setItem('userData', JSON.stringify(res));
            this.autoLogout(+res.expiresIn * 1000);
        }));
    }

    logout() {
        this.router.navigate(['/loginOrSignup']);
        localStorage.removeItem('userData');
        if(this.expiTimer) {
            clearTimeout(this.expiTimer);
        }
        this.expiTimer = null;
    }

    autoLogout(expDuration: number) {
        this.expiTimer = setTimeout(() => {
            this.logout();
        }, expDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown message occured!';
        console.log(errorRes);
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exits already!';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Insufficient permissions: Operation denied!';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts: Retry after some time!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid email or password!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'User account is disabled!';
                break;
        }
        return throwError(errorMessage);
    }
}