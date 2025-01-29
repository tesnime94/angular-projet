import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DressModel} from '../models/dress-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DressService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllDresses(): Observable<DressModel[]> {
    return this.http.get<DressModel[]>(`${this.baseUrl}/robe/all`);
  }

  addToCart(userId: string, dressId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/purchase`, null, {
      params: {
        userId: userId,
        robeId: dressId.toString(),
        quantity: '1'
      }
    });
  }
}
