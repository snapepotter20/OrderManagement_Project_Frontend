import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcurementService {
  private BASE_URL = 'http://localhost:8093/api/procurement/purchase-orders';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createOrder(orderData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.BASE_URL}/createorder`, orderData, {
      headers,
    });
  }

  getAllOrders(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.BASE_URL}/getallorders`, { headers });
  }

  getOrderById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.BASE_URL}/getorder/${id}`, { headers });
  }

  getDeliveryTrackingByOrderId(orderId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(
      `http://localhost:8093/api/procurement/delivery-tracking/${orderId}`,
      { headers }
    );
  }

  getFilteredOrders(status: string, date: string | null): Observable<any[]> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams();

    if (status) params = params.set('status', status);
    if (date) params = params.set('date', date);

    return this.http.get<any[]>(`${this.BASE_URL}/getallorders`, {
      headers,
      params,
    });
  }
  downloadInvoice(orderId: number): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http.get(
      `${this.BASE_URL}/generate-invoice/${orderId}`,
      { headers, responseType: 'blob' } // important for file downloads
    );
  }
}
