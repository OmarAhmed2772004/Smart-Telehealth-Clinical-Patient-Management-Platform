import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../features/users/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api = 'http://localhost:4000/api/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.api);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.api}/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.api, user);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.api}/${id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.api}/${id}`);
    }
}