import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor';
import { Doctor } from './doctor.interface';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {

  doctors: Doctor[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load doctors.';
        this.isLoading = false;
      }
    });
  }

  deleteDoctor(id: string): void {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.successMessage = 'Doctor deleted successfully.';
        this.doctors = this.doctors.filter(d => d._id !== id);
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to delete doctor.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  getUserName(doctor: Doctor): string {
    if (typeof doctor.userId === 'object' && doctor.userId !== null) {
      return (doctor.userId as any).fullName || 'N/A';
    }
    return 'N/A';
  }

  logout(): void {
    this.authService.logout();
  }
}
