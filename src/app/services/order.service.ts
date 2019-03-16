import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../classes/order';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(page: number = 1): Observable<Order[]> {
    return this.http.get<Order[]>(Settings.API_ENDPOINT + `/orders/order/list/?page=${page}`);
  }

}
