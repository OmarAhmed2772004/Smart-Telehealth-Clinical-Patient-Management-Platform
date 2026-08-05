import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor';
import { Doctor } from '../doctor-list/doctor.interface';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css',
})
export class DoctorDetails implements OnInit {

  doctor: Doctor | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDoctor(id);
    }
  }

  loadDoctor(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.doctorService.getDoctorById(id).subscribe({
      next: (data) => {
        this.doctor = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load doctor details.';
        this.isLoading = false;
      }
    });
  }

  getUserName(): string {
    if (!this.doctor) return 'N/A';
    if (typeof this.doctor.userId === 'object' && this.doctor.userId !== null) {
      return (this.doctor.userId as any).fullName || 'N/A';
    }
    return 'N/A';
  }

  getUserEmail(): string {
    if (!this.doctor) return 'N/A';
    if (typeof this.doctor.userId === 'object' && this.doctor.userId !== null) {
      return (this.doctor.userId as any).email || 'N/A';
    }
    return 'N/A';
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
