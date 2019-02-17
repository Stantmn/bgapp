import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { User } from '../classes/user';
import { UsersList } from '../classes/users-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(tableParams: any): Observable<UsersList> {
    return;
  }

  getUser(id: number): Observable<User> {
    return;
  }

  deleteUser(id: number): Observable<any> {
    return;
  }

  addUser(user: User) {
    return;
  }

  updateUser(user: User) {
    return;
  }

}
