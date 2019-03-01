import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { routerTransition } from '../../router.animations';
import { StoreService } from '../../services/store.service';
import { Store } from '../../classes/store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, StoreService],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {
  public usersList: User[] = [];
  public user = new User;
  public storesList: Store[];
  public roles = ['admin', 'user'];
  public statuses = ['enabled', 'disabled'];
  public showFormFlag = false;

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
          this.modal.openMessage('Server Error', 'Can\'t get stores information', 0);
          console.log(error);
        },
        () => {
          this.getUsers();
        }
      );
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        response => {
          this.usersList = response;
          for (let i = 0; i < this.usersList.length; i++) {
            const k = this.storesList.map(e => e._id).indexOf(this.usersList[i].submerchant);
            this.usersList[i].storeName = this.storesList[k].storeName;
          }
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get users information', 0);
          console.log(error);
        }
      );
  }

  userSave(): void {
    if (this.user.email) {
      if (this.user._id) {
        this.userService.updateUser(this.user)
          .subscribe(
            response => {},
            error => {
              this.modal.openMessage('Server Error', 'Can\'t save the user information', 0);
              console.log(error);
            },
            () => {
              this.getUsers();
              this.userCancel();
            }
          );
      } else {
        this.userService.addUser(this.user)
          .subscribe(
            response => {},
            error => {
              this.modal.openMessage('Server Error', 'Can\'t save the user information', 0);
              console.log(error);
            },
            () => {
              this.getUsers();
              this.userCancel();
            }
          );
      }
    }
  }

  editUser(_id: string): void {
    this.userService.getUser(_id)
      .subscribe(
        response => {
          this.user = response;
          this.showForm(!this.showFormFlag);
          this.getUsers();
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the User', 0);
          console.log(error);
        }
      );
  }

  deleteUser(_id: string): void {
    this.modal.openMessage('Remove this user method?', 'You can\'t restore deleted users', 1)
      .then(result => {
        if (result) {
          this.userService.deleteUser(_id)
            .subscribe(
              response => {
                this.user = response;
                this.getUsers();
              },
              error => {
                this.modal.openMessage('Server Error', 'Can\'t delete the User', 0);
                console.log(error);
              }
            );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  userCancel(): void {
    this.user = new User();
    this.showFormFlag = false;
  }

  showForm(flag: boolean): void {
    this.showFormFlag = flag;
  }
}
