// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Role {
  role_id: number;
}

interface UserPayload {
  username: string;
  password: string;
  email: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8092/api/adduser'; // Adjust endpoint accordingly

  constructor(private http: HttpClient) {}

  createUser(user: UserPayload): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, user, { headers });
  }

  // user.service.ts
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8092/api/roles');
  }

  getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8092/api/getallusers');
  }

  deleteUser(id:any): Observable<any[]>{
    return this.http.delete<any[]>(`http://localhost:8092/api/deleteuser/${id}`)
  }

updateUser(id: number, user: any) {
  return this.http.put(`http://localhost:8092/api/updateuser/${id}`, user ,{ responseType: 'text' });
}
}
