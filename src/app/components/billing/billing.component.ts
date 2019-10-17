import { Component, Inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { routerTransition } from '../../router.animations';
import { Store } from '../../classes/store';
import { StoreService } from '../../services/store.service';
import { Webhook } from '../../classes/webhook';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [StoreService],
  animations: [routerTransition()]
})
export class BillingComponent implements OnInit {
  public storesList: Store[];

  constructor(private storeService: StoreService, private modal: ModalComponent, @Inject(DOCUMENT) document) {
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

  customCharge(storeId: string): void {
    const amount = parseFloat((document.getElementById(storeId) as HTMLInputElement).value);
    this.modal.openMessage('Create a custom charge?', 'Charge $' + amount + ' will be implemented for the current store', 1)
      .then(result => {
        if (result && storeId) {
          this.storeService.customCharge(storeId, amount)
            .subscribe(
              res => {
                this.modal.openMessage('Billing', res.message, 0);
              },
              error => {
                this.modal.openMessage('Server Error', 'Can\'t charge the store', 0);
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

  createBilling(storeId): void {
    if (storeId) {
      this.storeService.createBilling(storeId)
        .subscribe(
          res => {
            this.modal.openMessage('Billing', res.message, 0);
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
          this.storeService.cancelBilling(storeId)
            .subscribe(
              res => {
                this.modal.openMessage('Billing', res.message, 0);
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
