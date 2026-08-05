import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.css',
})
export class DoctorForm implements OnInit {

  doctorForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  doctorId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.doctorForm = this.fb.group({
      userId: ['', [Validators.required]],
      specialization: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.doctorId;

    if (this.isEditMode && this.doctorId) {
      this.isLoading = true;
      this.doctorService.getDoctorById(this.doctorId).subscribe({
        next: (doctor) => {
          const userId = typeof doctor.userId === 'object'
            ? (doctor.userId as any)._id
            : doctor.userId;
          this.doctorForm.patchValue({
            userId,
            specialization: doctor.specialization,
            bio: doctor.bio || ''
          });
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to load doctor data.';
          this.isLoading = false;
        }
      });
    }
  }

  get userId() { return this.doctorForm.get('userId')!; }
  get specialization() { return this.doctorForm.get('specialization')!; }
  get bio() { return this.doctorForm.get('bio')!; }

  submit(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = this.doctorForm.value;

    const request$ = this.isEditMode && this.doctorId
      ? this.doctorService.updateDoctor(this.doctorId, payload)
      : this.doctorService.createDoctor(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = this.isEditMode
          ? 'Doctor updated successfully!'
          : 'Doctor created successfully!';
        setTimeout(() => this.router.navigate(['/doctors']), 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'An error occurred. Please try again.';
      }
    });
  }
}
