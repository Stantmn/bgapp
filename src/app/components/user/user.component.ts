import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserService]
})
export class UserComponent implements OnInit {
  public userList: User[] = [];
  public user: User;
  public errorMessage: any;
  public roles: {
    User: 'User',
    Admin: 'Admin'
  };
  constructor(private userService: UserService, private modal: ModalComponent) { }

    ngOnInit() {}
}
