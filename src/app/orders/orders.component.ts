import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderDto } from '../DTOs/OrderDto';
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
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders(4).subscribe((res) => {
      this.orders = res;
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
    // this.confirmationService.confirm({
    //   message: 'Bạn có muốn hủy đơn hàng này không?',
    //   header: 'Hủy đơn hàng',
    //   icon: 'pi pi-exclamation-triangle',
    //   rejectLabel: 'Không',
    //   acceptLabel: 'Ok',
    //   accept: () => {},
    // });
  }
  cancelOrder() {
    this.orderService
      .cancelOrder(this.orders[this.i_current_order].id, this.cancelNote)
      .subscribe((res) => {
        console.log(res);

        if (res) {
          this.orders[this.i_current_order].orderStatus = 0;
          this.cancelNote = '';
          this.isShowConfirmCancelOrder = false;
        }
      });
  }
  closeConfirmCancelOrder() {
    this.isShowConfirmCancelOrder = false;
  }
}