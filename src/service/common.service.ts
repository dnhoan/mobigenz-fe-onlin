import { Injectable } from '@angular/core';
import { OrderStatus } from 'src/app/DTOs/OrderStatus';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  orderStatuses: OrderStatus[] = [
    {
      status: 0,
      statusName: 'Đang chờ',
      color: 'secondary',
      icon: 'loading',
    },
    {
      status: 1,
      statusName: 'Xác nhận',
      color: 'primary',
      icon: 'check',
    },

    {
      status: 2,
      statusName: 'Đã đóng gói',
      color: 'warning',
      icon: 'dropbox',
    },
    {
      status: 3,
      statusName: 'Đang vận chuyển',
      color: 'info',
      icon: 'car',
    },
    {
      status: 4,
      statusName: 'Hoàn thành',
      color: 'success',
      icon: 'check-circle',
    },
    {
      status: -1,
      statusName: 'Hủy',
      color: 'danger',
      icon: 'stop',
    },
  ];
}
