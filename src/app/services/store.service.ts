import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { StoresList } from '../classes/stores-list';
import { Observable } from 'rxjs';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) {
  }

  getStores(): Observable<StoresList> {
    return this.http.get<StoresList>(Settings.API_ENDPOINT + '/stores');
  }

}
