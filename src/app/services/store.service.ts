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
    return this.http.get<Store[]>(Settings.API_ENDPOINT + '/stores');
  }

  getStore(_id: string): Observable<Store> {
    return this.http.get<Store>(Settings.API_ENDPOINT + '/stores/' + _id);
  }

  deleteStore(_id: string): Observable<any> {
    return this.http.delete<any>(Settings.API_ENDPOINT + '/stores/' + _id);
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(Settings.API_ENDPOINT + '/stores/', store);
  }

  updateStore(store: Store) {
    return this.http.put(Settings.API_ENDPOINT + '/stores/', store);
  }

  getLocations(_id: string): Observable<any> {
    return this.http.get<any>(Settings.API_ENDPOINT + '/stores/locations/' + _id);
  }

  getWebhooks(_id: string): Observable<any> {
    return this.http.get<any>(Settings.API_ENDPOINT + '/stores/webhooks/' + _id);
  }

}
