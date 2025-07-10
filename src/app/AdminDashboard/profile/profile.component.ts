import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Dummy user data – replace with real backend call
    const userData = {
      username: 'admin123',
      email: 'admin@in.bosch.com',
      phone: '9876543210',
      role: 'Admin',
    };

    this.profileForm = this.fb.group({
      username: [userData.username, Validators.required],
      email: [userData.email, [Validators.required, Validators.email]],
      phone: [userData.phone, Validators.required],
      role: [{ value: userData.role, disabled: true }],
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.profileForm.get('username')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('phone')?.enable();
    } else {
      this.profileForm.get('username')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('phone')?.disable();
    }
  }

  onSave() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue();

      // TODO: Send updatedData to backend via HTTP PUT/POST request
      console.log('Updated Profile Data:', updatedData);

      this.toggleEdit(); // Exit edit mode
    }
  }
  
}
