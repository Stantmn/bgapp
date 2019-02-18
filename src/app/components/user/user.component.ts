import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { routerTransition } from '../../router.animations';
import { StoresList } from '../../classes/stores-list';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, StoreService],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {
  public userList: User[] = [];
  public user = new User;
  public storesList: StoresList;
  public errorMessage: any;
  public roles = ['admin', 'user'];
  public statuses = ['enabled', 'disabled'];

  constructor(private userService: UserService, private storeService: StoreService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores()
      .subscribe(
        response => {
          this.storesList = response;
        },
        error => {
          this.modal.errorMessage(error.error)
            .catch(err => {
              this.modal.openMessage('Server Error', 'Can\'t get stores information', 0);
              console.log(err);
            });
        }
      );
  }

  userSave(): void {
  }

  userCancel(): void {
  }
}
