import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../classes/order';
import { PaginationButton } from '../constants/enums';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(page = PaginationButton.Next, cursor = ''): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(Settings.API_ENDPOINT + `/orders/order/list/?page=${page}&cursor=${cursor}`);
  }

}
