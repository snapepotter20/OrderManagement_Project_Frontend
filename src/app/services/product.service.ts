import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8093/api/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallproducts`);
  }
}
