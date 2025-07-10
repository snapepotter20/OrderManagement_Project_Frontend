import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

interface Role {
  role_id: number;
  roleName: string;
}

interface User {
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
  styleUrl: './viewuser.component.css'
})
export class ViewuserComponent implements OnInit {
  allusers: User[] = [];
  roles: Role[] = [];

  isEditModalOpen = false;
  editForm!: FormGroup;
  selectedUserId: number | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.fetchAllUsers();
    this.fetchAllRoles(); // You must implement this in your UserService

    this.editForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      role: ['']
    });
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.allusers = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      }
    });
  }

  fetchAllRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Failed to fetch roles', err);
      }
    });
  }

  onEdit(user: User): void {
    this.isEditModalOpen = true;
    this.selectedUserId = user.user_id;

    this.editForm.patchValue({
      username: user.username,
      email: user.email,
      password: '', // keep empty; update only if changed
      role: user.role.role_id
    });
  }

  onDelete(user: User): void {
    this.userService.deleteUser(user.user_id).subscribe({
      next: () => this.fetchAllUsers(),
      error: (err) => console.error('Delete failed', err)
    });
  }

  onUpdate(): void {
    if (this.selectedUserId !== null) {
      const updatedUser = {
        ...this.editForm.value,
        role: { role_id: this.editForm.value.role }
      };

      this.userService.updateUser(this.selectedUserId, updatedUser).subscribe({
        next: () => {
          this.fetchAllUsers();
          this.isEditModalOpen = false;
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
  }
}
