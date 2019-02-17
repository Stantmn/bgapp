import { Injectable } from '@angular/core';
import { Settings } from '../../constants/settings';
import { User } from '../../classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AccountService {

  constructor(public http: HttpClient) {
  }


}
