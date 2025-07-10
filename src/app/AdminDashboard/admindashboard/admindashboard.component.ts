import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CreateuserComponent } from '../createuser/createuser.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CreateuserComponent,
    ViewuserComponent,
    ProfileComponent,
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  selectedTab: 'create' | 'view' | 'profile' = 'create';

  constructor(private authService: AuthService, private router: Router) {}

  Logout(): any {
    console.log("Inside Logout funtion");
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
