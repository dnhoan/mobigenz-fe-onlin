import { Component, OnInit } from '@angular/core';
import { CustomersAddress } from '../DTOs/CustomersAddress';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isDelivery: string = '1';
  addresses: CustomersAddress[] = [];
  addressSelected!: CustomersAddress;
  checked = false;
  city!: string;
  cart = {
    id: 1,
    totalMoney: 100000000,
    itemsAmount: 4,
    cartItemDtos: [
      {
        id: 1,
        amount: 1,
        productDetailCartDto: {
          id: 221,
          price: 27000000,
          sku: '12gb, Đỏ',
          image:
            'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667723707841?alt=media&token=3e5ebe6d-6a3b-45c5-8974-c023fe2f5e07',
          productName: 'Samsung Galaxy S22 Ultra',
        },
      },
      {
        id: 2,
        amount: 2,
        productDetailCartDto: {
          id: 216,
          price: 22000000,
          sku: '12gb, Xanh',
          image:
            'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667723632280?alt=media&token=0f509aa2-2431-4d56-8567-3308f93faf17',
          productName: 'Samsung Galaxy S22 Ultra',
        },
      },
    ],
  };
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getAddressesByCustomerId(4).subscribe((res) => {
      this.addresses = res;
      if (this.addresses.length) {
        this.addressSelected = this.addresses.find(
          (address) => address.id === 1
        ) as CustomersAddress;
      }
      console.log(this.addresses);
    });
  }
}
