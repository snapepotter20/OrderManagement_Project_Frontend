import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private baseUrl = 'http://localhost:8092/api'; 

  constructor(private http: HttpClient) {}

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, { email });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, {
      email,
      // otp,
      newPassword,
    });
  }
}
