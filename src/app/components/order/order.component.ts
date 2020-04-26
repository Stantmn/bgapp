import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Order } from '../../classes/order';
import { PaginationButton } from 'src/app/constants/enums';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  ordersList: Order[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  paginationButton = PaginationButton;

  constructor(private orderService: OrderService, private userService: UserService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(page?: PaginationButton, cursor?: string): void {
    this.orderService.getOrders(page, cursor)
      .subscribe(
        response => {
          this.ordersList = response.orders;
          this.hasNextPage = response.pageInfo.hasNextPage;
          this.hasPreviousPage = response.pageInfo.hasPreviousPage;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Orders', 0);
          console.log(error);
        }
      );
  }
}
