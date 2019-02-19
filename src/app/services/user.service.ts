import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { User } from '../classes/user';
import { UsersList } from '../classes/users-list';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(tableParams: any): Observable<UsersList> {
    return this.http.get<UsersList>(Settings.API_ENDPOINT + '/users/', {params: tableParams});
  }

  getUser(_id: string): Observable<User> {
    return this.http.get<User>(Settings.API_ENDPOINT + '/users/' + _id);
  }

  deleteUser(_id: string): Observable<any> {
    return this.http.delete<any>(Settings.API_ENDPOINT + '/users/' + _id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(Settings.API_ENDPOINT + '/users/', user);
  }

  updateUser(user: User) {
    return this.http.put(Settings.API_ENDPOINT + '/users/', user);
  }

}
