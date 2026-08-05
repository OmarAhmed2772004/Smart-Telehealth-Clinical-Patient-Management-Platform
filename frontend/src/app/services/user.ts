import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../features/users/user.interface';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api = 'http://localhost:4000/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<ApiResponse<User[]>>(this.api).pipe(
            map(res => res.data)
        );
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<ApiResponse<User>>(`${this.api}/${id}`).pipe(
            map(res => res.data)
        );
    }

    createUser(user: User): Observable<User> {
        return this.http.post<ApiResponse<User>>(this.api, user).pipe(
            map(res => res.data)
        );
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<ApiResponse<User>>(`${this.api}/${id}`, user).pipe(
            map(res => res.data)
        );
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.api}/${id}`);
    }
}