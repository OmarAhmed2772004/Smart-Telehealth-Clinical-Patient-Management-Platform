import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from '../features/doctor-list/doctor.interface';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private api = 'http://localhost:4000/doctors';

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        return this.http.get<ApiResponse<Doctor[]>>(this.api).pipe(
            map(res => res.data)
        );
    }

    getDoctorById(id: string): Observable<Doctor> {
        return this.http.get<ApiResponse<Doctor>>(`${this.api}/${id}`).pipe(
            map(res => res.data)
        );
    }

    createDoctor(doctor: Partial<Doctor>): Observable<Doctor> {
        return this.http.post<ApiResponse<Doctor>>(this.api, doctor).pipe(
            map(res => res.data)
        );
    }

    updateDoctor(id: string, doctor: Partial<Doctor>): Observable<Doctor> {
        return this.http.put<ApiResponse<Doctor>>(`${this.api}/${id}`, doctor).pipe(
            map(res => res.data)
        );
    }

    deleteDoctor(id: string): Observable<any> {
        return this.http.delete(`${this.api}/${id}`);
    }
}
