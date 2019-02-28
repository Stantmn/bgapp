import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  public user: User;

  constructor(public router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.setUserName();
    setInterval(() => {
      this.checkToken();
    }, 600000);
  }

  private setUserName() {
    this.user = this.userService.getUserStorage();
  }

  private checkToken() {
    const user: User = this.userService.getUserStorage();
    const expirationTime = new Date(new Date(user.expiration).toLocaleString());
    const currentTime = new Date();
    const refreshTime = new Date();
    // logout after 20min inactivity
    refreshTime.setMinutes(refreshTime.getMinutes() + 10);
    if (currentTime > expirationTime) {
      this.router.navigate(['/login']);
    } else if (refreshTime > expirationTime) {
      this.userService.refreshToken()
        .subscribe(
          data => {
            user.token = data.token;
            const expDate = new Date();
            user.expiration = data.expiration;
            this.userService.setToLocalStorage(user);
          },
          err => {
            console.log(err);
            this.router.navigate(['/login']);
          });
    }

  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLogged');
  }

}
