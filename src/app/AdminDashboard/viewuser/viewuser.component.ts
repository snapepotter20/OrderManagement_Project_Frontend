import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface Role {
  role_id: number;
  roleName: string;
}

interface User {
  phoneno: string;
  user_id: number;
  username: string;
  email: string;
  password?: string;
  role: Role;
  action1?: string;
  action2?: string;
}

@Component({
  selector: 'app-viewuser',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.css',
})
export class ViewuserComponent implements OnInit {
  allusers: User[] = [];
  roles: Role[] = [];

  isEditModalOpen = false;
  editForm!: FormGroup;
  selectedUserId: number | null = null;

  constructor(private userService: UserService, private fb: FormBuilder,public toastr: ToastrService) {}

  ngOnInit() {
    this.fetchAllUsers();
    this.fetchAllRoles(); // You must implement this in your UserService

    this.editForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      role: [''],
      phoneno: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.allusers = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      },
    });
  }

  fetchAllRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Failed to fetch roles', err);
      },
    });
  }

  onEdit(user: User): void {
    this.isEditModalOpen = true;
    this.selectedUserId = user.user_id;

    this.editForm.patchValue({
      username: user.username,
      email: user.email,
      password: '', // keep empty; update only if changed
      phoneno: user.phoneno,
      role: user.role.role_id,
    });
  }

  // onDelete(user: User): void {
  //   this.userService.deleteUser(user.user_id).subscribe({
  //     next: () => this.fetchAllUsers(),
  //     error: (err) => console.error('Delete failed', err)
  //   });
  // }

  onDelete(user: any): void {
    const confirmed = confirm(
      `Are you sure you want to delete user "${user.username}"?`
    );
    if (confirmed) {
      // Call the delete API or service
      this.userService.deleteUser(user.user_id).subscribe({
        next: () => {
          alert(`User "${user.username}" deleted successfully.`);
          // Refresh user list or remove the user from the array
          this.allusers = this.allusers.filter(
            (u) => u.user_id !== user.user_id
          );
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again.');
        },
      });
    }
  }

  onUpdate(): void {
    if (this.selectedUserId !== null) {
      const updatedUser = {
        ...this.editForm.value,
        role: { role_id: this.editForm.value.role },
      };

      this.userService.updateUser(this.selectedUserId, updatedUser).subscribe({
        next: () => {
          this.fetchAllUsers();
          this.isEditModalOpen = false;
          this.toastr.success('User updated successfully!');
        },
        error: (err) => {
           this.toastr.error('Error updating user');
          console.error('Update failed', err);
        },
      });
    }
  }

    allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
  }
}
