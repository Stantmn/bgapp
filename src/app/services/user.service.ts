import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { User } from '../classes/user';
import { UsersList } from '../classes/users-list';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface Login {
  email: string;
  password: string;
}

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

  login(login: Login): Observable<any> {
    return this.http.post<any>(Settings.API_ENDPOINT + '/users/login', login);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserStorage(): User {
    const user = new User;
    user.email = localStorage.getItem('email');
    user.token = localStorage.getItem('token');
    user.expiration = localStorage.getItem('expiration');
    return user;
  }

  setToLocalStorage(user: User): void {
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('expiration', user.expiration);
    localStorage.setItem('isLogged', 'true');
  }

}
