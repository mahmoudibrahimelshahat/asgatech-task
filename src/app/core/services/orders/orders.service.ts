import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('../../../../assets/db/orders.json');
  }

  
}
