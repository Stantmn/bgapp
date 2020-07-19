import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Order, OrderPageInfo } from '../../classes/order';
import { PaginationButton } from 'src/app/constants/enums';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  ordersList: Order[];
  pageInfo: OrderPageInfo;
  paginationButton = PaginationButton;
  includeDraftOrders: boolean;

  constructor(private orderService: OrderService, private userService: UserService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(page?: PaginationButton, cursor?: string, includeDraftOrders?: boolean): void {
    this.orderService.getOrders(page, cursor, includeDraftOrders)
      .subscribe(
        response => {
          this.ordersList = response.orders;
          this.pageInfo = response.pageInfo;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get Orders', 0);
          console.log(error);
        }
      );
  }

  fulfillOrder(orderId: number): void {
    this.orderService.fulfillOrder(orderId)
      .subscribe(
        () => {
          this.modal.openMessage('Fulfillment', `The order: ${orderId} was fulfilled`, 0);
          this.getOrders();
        },
        error => {
          this.modal.openMessage('Server Error', `Can\'t fulfill the Order: ${orderId}`, 0);
          console.log(error);
        }
      );
  }

  createLabel(orderId: number): void {
    this.orderService.createLabel(orderId)
      .subscribe(
        () => {
          this.modal.openMessage('Fulfillment', `Label for the order: ${orderId} was created`, 0);
          this.getOrders();
        },
        error => {
          this.modal.openMessage('Server Error', `Can\'t create label for the order: ${orderId}`, 0);
          console.log(error);
        }
      );
  }
}
