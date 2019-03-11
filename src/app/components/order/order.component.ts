import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Order } from '../../classes/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  public ordersList: Order[];
  public page = 1;

  constructor(private orderService: OrderService, private userService: UserService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders(this.page)
      .subscribe(
        response => {
          this.ordersList = response;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Store', 0);
          console.log(error);
        }
      );
  }
}
