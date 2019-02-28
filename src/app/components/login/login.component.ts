import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { User } from '../../classes/user';
import { Settings } from '../../constants/settings';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public message = '';

  constructor(
    private userService: UserService,
    private modal: ModalComponent,
    private router: Router
    ) {
    this.user = new User();
  }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('isLogged');
  }

  onLogIn(): void {
    this.userService.login({
      email: this.user.email,
      password: this.user.password
    }).subscribe(
      response => {
        this.user = response;
        this.userService.setToLocalStorage(this.user);
        this.message = '';
        this.router.navigate(['dashboard']);
      },
      error => {
        this.modal.openMessage('Can\'t login', 'Check your email and password', 0);
        console.log(error);
      }
    );

  }

}
