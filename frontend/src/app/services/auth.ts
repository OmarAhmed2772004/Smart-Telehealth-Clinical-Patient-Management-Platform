import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api = "http://localhost:4000/auth";

    constructor(private http: HttpClient, private router: Router) { }

    login(data: any): Observable<any> {
        return this.http.post(`${this.api}/login`, data);
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.api}/register`, data);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}