import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../classes/product';
import { Category } from '../classes/category';
import { ShippingRate } from '../classes/shipping-rate';

@Injectable()
export class RateService {
  constructor(private http: HttpClient) {
  }

  getRates(storeId?: string): Observable<ShippingRate[]> {
    const path = storeId ? `/${storeId}` : '';
    return this.http.get<ShippingRate[]>(Settings.API_ENDPOINT + `/rates` + path);
  }


  loadRates(rates: ShippingRate[], storeId?: string): Observable<any> {
    const path = storeId ? `/${storeId}` : '';
    return this.http.post<ShippingRate[]>(Settings.API_ENDPOINT + '/rates' + path, rates);
  }
}
