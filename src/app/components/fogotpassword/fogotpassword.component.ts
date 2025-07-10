import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-fogotpassword',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,CommonModule],
  templateUrl: './fogotpassword.component.html',
  styleUrl: './fogotpassword.component.css'
})
export class FogotpasswordComponent {
 forgotForm: FormGroup;
  otpSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  sendOtp() {
    const email = this.forgotForm.value.email;
    this.forgotPasswordService.sendOtp(email).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent to your email');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to send OTP');
      },
    });
  }

  onResetPassword() {
    if (this.forgotForm.invalid) return;

    const { email, otp, newPassword, confirmPassword } = this.forgotForm.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.forgotPasswordService.resetPassword(email, newPassword).subscribe({
      next: () => {
        alert('Password reset successful');
        this.router.navigate(['/']); // Redirect to login
      },
      error: (err:any) => {
        console.error(err);
        alert('Failed to reset password');
      },
    });
  }
}
