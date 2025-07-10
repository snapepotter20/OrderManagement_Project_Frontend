// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone:true,
//   imports:[RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   // Optionally for role selection
//   // selectedRole: string = 'user';
//   // selectedUserSubRole: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       username: [
//         '',
//         [
//           Validators.required,
//           // Validators.email,
//           // Validators.pattern('^[a-zA-Z0-9._%+-]+@in\\.bosch\\.com$')
//         ]
//       ],
//       password: ['', Validators.required]
//     });
//   }

//   // Easy form access
//   get f() {
//     return this.loginForm.controls;
//   }

//   onLogin(): void {
//     if (this.loginForm.invalid) return;

//     const credentials = this.loginForm.value;

//     this.http.post<any>('http://localhost:8092/api/login', credentials)
//       .subscribe({
//         next: (res) => {
//           localStorage.setItem('token', res.token);

//           const payload = JSON.parse(atob(res.token.split('.')[1]));
//           const role = payload?.authorities?.[0];
//           console.log("payload",payload);

//           if (role === 'ROLE_ADMIN') {
//             this.router.navigate(['/admin-dashboard']);
//           } else if (role === 'ROLE_USER') {
//             this.router.navigate(['/user-dashboard']);
//           } else {
//             this.router.navigate(['/dashboard']);
//           }
//         },
//         error: (err) => {
//           this.errorMessage = 'Invalid username or password';
//           console.error(err);
//         }
//       });
//   }

//   onReset(): void {
//     this.loginForm.reset();
//     this.errorMessage = '';
//   }

// }


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // adjust the path if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        const token = res.token;
        const role = this.authService.getUserRoleFromToken(token);
        console.log('Role from token:', role);

        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'ROLE_PROCUREMENT_OFFICER') {
          this.router.navigate(['/procurement-dashboard']);
        } else if (role === 'ROLE_INVENTORY_MANAGER') {
          this.router.navigate(['/inventory-dashboard']);
        }else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        console.error(err);
      }
    });
  }

  onReset(): void {
    this.loginForm.reset();
    this.errorMessage = '';
  }
}
