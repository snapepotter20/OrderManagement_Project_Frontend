import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InventoryTransaction {
  transactionId?: number;
  userId: number;
  transactionDate: string;
  transactionType: string;
  quantity: number;
  reference: string;
  products: { productId: number,productName: String }[];
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private BASE_URL = 'http://localhost:8093/api/inventorytransactions';

  constructor(private http: HttpClient) {}

  createTransaction(data: InventoryTransaction): Observable<InventoryTransaction> {
    return this.http.post<InventoryTransaction>(`${this.BASE_URL}/create`, data);
  }

  getAllTransactions(): Observable<InventoryTransaction[]> {
    return this.http.get<InventoryTransaction[]>(`${this.BASE_URL}/all`);
  }
}
