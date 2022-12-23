import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/service/common.service';
import { customerStore } from '../customer.repository';
import { OrderDto } from '../DTOs/OrderDto';
import { CustomerDTO } from '../login/account.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];
  productDialog: boolean = false;
  currentOrder!: OrderDto;
  isShowConfirmCancelOrder = false;
  i_current_order!: number;
  cancelNote: string = '';
  constructor(
    private message: MessageService,
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    public commonService: CommonService
  ) {}
  customer!: CustomerDTO;
  subCustomer!: Subscription;
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
  ngOnInit() {
    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer;
        this.orderService.getOrders(this.customer.id!).subscribe((res) => {
          this.orders = res;
        });
      }
    });
  }
  searchOrder(event: any) {}
  hideDialog() {
    this.productDialog = false;
  }

  showOrderDetail(order: OrderDto) {
    this.productDialog = true;
    this.currentOrder = order;
  }
  showConfirmCancelOrder(i_order: number) {
    this.i_current_order = i_order;
    this.isShowConfirmCancelOrder = true;
  }
  cancelOrder() {
    this.orderService
      .cancelOrder(this.orders[this.i_current_order].id, this.cancelNote)
      .subscribe((res) => {
        if (res) {
          this.orders[this.i_current_order].orderStatus = -1;
          this.cancelNote = '';
          this.isShowConfirmCancelOrder = false;
        }
      });
  }
  receivedOrder(order_id: number, i_order: number) {
    this.confirmationService.confirm({
      message: 'Bạn muốn xác nhận đã nhận được đơn hàng không?',
      accept: () => {
        this.orderService.receivedOrder(order_id).subscribe((res) => {
          if (res) {
            this.orders[i_order].orderStatus = 4;
            this.cancelNote = '';
            this.isShowConfirmCancelOrder = false;
          }
        });
      },
    });
  }
  closeConfirmCancelOrder() {
    this.isShowConfirmCancelOrder = false;
  }
}
