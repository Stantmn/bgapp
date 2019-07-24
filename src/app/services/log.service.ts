import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) {
  }

  getLogs(): Observable<string[]> {
    return this.http.get<string[]>(Settings.API_ENDPOINT + '/logs/');
  }
}
