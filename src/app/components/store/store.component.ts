import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { routerTransition } from '../../router.animations';
import { Store } from '../../classes/store';
import { StoreService } from '../../services/store.service';
import { Webhook } from '../../classes/webhook';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [StoreService],
  animations: [routerTransition()]
})
export class StoreComponent implements OnInit {
  public store = new Store;
  public storesList: Store[];
  public statuses = ['enabled', 'disabled'];
  public showFormFlag = false;
  public locations: Location[];
  public webhooks: Webhook[];

  constructor(private storeService: StoreService, private modal: ModalComponent) {
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
        }
      );
  }

  storeSave(): void {
    if (this.store._id) {
      this.storeService.updateStore(this.store)
        .subscribe(
          response => {
          },
          error => {
            this.modal.openMessage('Server Error', 'Can\'t save the store information', 0);
            console.log(error);
          },
          () => {
            this.getStores();
            this.storeCancel();
          }
        );
    } else {
      this.storeService.addStore(this.store)
        .subscribe(
          response => {
          },
          error => {
            this.modal.openMessage('Server Error', 'Can\'t save the store information', 0);
            console.log(error);
          },
          () => {
            this.getStores();
            this.storeCancel();
          }
        );
    }
  }

  editStore(_id: string): void {
    this.storeService.getStore(_id)
      .subscribe(
        response => {
          this.store = response;
          this.showForm(!this.showFormFlag);
          this.getLocations();
          this.getWebhooks();
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Store', 0);
          console.log(error);
        }
      );
  }

  deleteStore(_id: string): void {
    this.modal.openMessage('Remove this store method?', 'You can\'t restore deleted stores', 1)
      .then(result => {
        if (result) {
          this.storeService.deleteStore(_id)
            .subscribe(
              response => {
                this.store = response;
                this.getStores();
              },
              error => {
                this.modal.openMessage('Server Error', 'Can\'t delete the Store', 0);
                console.log(error);
              }
            );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLocations(): void {
    this.storeService.getLocations(this.store._id)
      .subscribe(
        response => {
          this.locations = response;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the locations', 0);
        }
      );
  }

  getWebhooks(): void {
    this.storeService.getWebhooks(this.store._id)
      .subscribe(
        response => {
          this.webhooks = response;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the webhooks', 0);
          console.log(error);
        }
      );
  }

  installService(_id: string): void {
    this.storeService.setWebhooks(_id)
      .subscribe(
        () => {
          this.modal.openMessage('Installation', 'Services and webhooks were installed', 0);
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the webhooks', 0);
          console.log(error);
        }
      );
  }

  storeCancel(): void {
    this.store = new Store();
    this.showFormFlag = false;
  }

  showForm(flag: boolean): void {
    this.showFormFlag = flag;
  }
}
