import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

 profileForm!: FormGroup;
  isEditing = false;
  profileId!: number;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: [{ value: '', disabled: true }],
    });

    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getProfile().subscribe({
      next: (data:any) => {
        this.profileId = data.id;
        this.profileForm.patchValue(data);
      },
      error: (err:any) => {
        console.error(err);
        // this.toastr.error('Failed to load profile', 'Error');
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    ['username', 'email', 'phone'].forEach((field) =>
      this.profileForm.get(field)?.[this.isEditing ? 'enable' : 'disable']()
    );
  }

  onSave() {
    if (this.profileForm.valid && this.profileId) {
      const updatedData = this.profileForm.getRawValue();
      this.profileService.updateProfile(this.profileId, updatedData).subscribe({
        next: () => {
          // this.toastr.success('Profile updated successfully', 'Success');
          this.toggleEdit();
        },
        error: (err:any) => {
          console.error(err);
          // this.toastr.error('Failed to update profile', 'Error');
        },
      });
    }
  }
  
}
