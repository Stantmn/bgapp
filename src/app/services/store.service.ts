import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../classes/store';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) {
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(Settings.API_ENDPOINT + '/stores/store/');
  }

  getStore(_id: string): Observable<Store> {
    return this.http.get<Store>(Settings.API_ENDPOINT + '/stores/store/' + _id);
  }

  deleteStore(_id: string): Observable<any> {
    return this.http.delete<any>(Settings.API_ENDPOINT + '/stores/store/' + _id);
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(Settings.API_ENDPOINT + '/stores/store/', store);
  }

  updateStore(store: Store) {
    return this.http.put(Settings.API_ENDPOINT + '/stores/store/', store);
  }

  createBilling(_id: string): Observable<any> {
    return this.http.post<any>(Settings.API_ENDPOINT + '/stores/store/billing/', {storeId: _id});
  }

  cancelBilling(_id: string): Observable<any> {
    return this.http.delete<any>(Settings.API_ENDPOINT + '/stores/store/billing/' + _id);
  }

  customCharge(storeId: string, amount: number): Observable<any> {
    return this.http.post<any>(Settings.API_ENDPOINT + '/stores/store/billing/charge', {storeId: storeId, amount: amount});
  }

  getLocations(_id: string): Observable<any> {
    return this.http.get<any>(Settings.API_ENDPOINT + '/stores/store/locations/' + _id);
  }

  getWebhooks(_id: string): Observable<any> {
    return this.http.get<any>(Settings.API_ENDPOINT + '/stores/store/webhooks/' + _id);
  }

  setWebhooks(_id: string): Observable<any> {
    return this.http.post<any>(Settings.API_ENDPOINT + '/stores/store/webhooks/' + _id, {});
  }
}
