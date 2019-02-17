import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { User } from '../../classes/user';
import { Settings } from '../../constants/settings';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onLoggedin(): void {
  }

}
