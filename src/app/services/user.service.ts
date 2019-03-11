import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { User } from '../classes/user';
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(Settings.API_ENDPOINT + '/users/');
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

  login(login: Login): Observable<User> {
    return this.http.post<User>(Settings.API_ENDPOINT + '/users/login', login);
  }

  refreshToken(): Observable<User> {
    return this.http.post<User>(Settings.API_ENDPOINT + '/users/refresh', {});
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserStorage(): User {
    const user = new User;
    user.email = localStorage.getItem('email');
    user.token = localStorage.getItem('token');
    user.expiration = localStorage.getItem('expiration');
    user.role = localStorage.getItem('role');
    user.isLogged = localStorage.getItem('isLogged');
    return user;
  }

  setToLocalStorage(user: User): void {
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('expiration', user.expiration);
    localStorage.setItem('role', user.role);
    localStorage.setItem('isLogged', 'true');
  }

}
