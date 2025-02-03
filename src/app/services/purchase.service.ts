import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Purchase {
  id: number;
  totalPrice: number;
  robe: { id: number; label: string };
  sellerEmail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/purchase';
  private userApiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getPurchases(userId: string | null): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/${userId}`);
  }

  getSellerEmail(robeId: number): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`${this.userApiUrl}/${robeId}`);
  }

  deletePurchase(purchaseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${purchaseId}`);
  }
}
