import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { routerTransition } from '../../router.animations';
import { Store } from '../../classes/store';
import { StoreService } from '../../services/store.service';
import { Webhook } from '../../classes/webhook';

@Component({
  selector: 'app-store',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [StoreService],
  animations: [routerTransition()]
})
export class BillingComponent implements OnInit {
  public storesList: Store[];

  constructor(private storeService: StoreService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores()
      .subscribe(
        stores => {
          this.storesList = stores;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get stores information', 0);
          console.log(error);
        }
      );
  }

  createBilling(storeId): void {
    if (storeId) {
      this.storeService.createBilling(storeId)
        .subscribe(
          store => {
            const index = this.storesList.indexOf(this.storesList.find(s => s._id === storeId));
            if (index !== -1) {
              this.storesList[index] = store;
            }
          },
          error => {
            this.modal.openMessage('Server Error', 'Can\'t set Billing for the store', 0);
            console.log(error);
          },
          () => {
            this.getStores();
          }
        );
    }
  }

  cancelBilling(storeId): void {
    this.modal.openMessage('Remove this store billing cycle?', 'Payments will not be charged for all orders', 1)
      .then(result => {
        if (result && storeId) {
          this.storeService.createBilling(storeId)
            .subscribe(
              () => {
                const index = this.storesList.indexOf(this.storesList.find(s => s._id === storeId));
                if (index !== -1) {
                  this.storesList[index].recurringPaymentId = null;
                }
              },
              error => {
                this.modal.openMessage('Server Error', 'Can\'t cancel Billing for the store', 0);
                console.log(error);
              },
              () => {
                this.getStores();
              }
            );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

}
