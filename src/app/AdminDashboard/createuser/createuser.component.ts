import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
})
export class CreateuserComponent implements OnInit {
  userForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).{8,}$'
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], // This will hold selected roleId
      phoneno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        console.log('Roles', this.roles);
        console.log('UserForm', this.userForm.value);
      },
      error: (err) => {
        this.toastr.error(err);
        console.error('Failed to fetch roles', err);
        this.errorMessage = 'Failed to load roles';
      },
    });
  }

  // showTestToast() {
  //   console.log('Toast clicked!');
  //   try {
  //     this.toastr.success('Hello from Toastr!', 'Success');
  //   } catch (err) {
  //     console.error('Toastr error:', err);
  //   }
  // }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('FormData', formData);
      // Wrap roleId inside a role object
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phoneno: formData.phoneno,
        role: {
          role_id: formData.role,
        },
      };

      this.userService.createUser(payload).subscribe({
        next: (res) => {
          this.toastr.success('User created successfully!');
          // this.successMessage = 'User created successfully!';
          this.errorMessage = '';
          this.userForm.reset();
        },
        error: (err) => {
          this.toastr.error(err);
          this.errorMessage = err.error?.error || 'Failed to create user';
          this.successMessage = '';
          console.error('Create user error:', err);
        },
      });
    } else {
      console.warn('Form invalid. Please check inputs.');
      this.toastr.warning('Please fill all required fields');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  enforceMaxLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
      this.userForm.get('phoneno')?.setValue(input.value);
    }
  }

  isFieldInvalid(fieldPath: string): boolean {
    const control = this.userForm.get(fieldPath);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
