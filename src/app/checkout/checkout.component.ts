import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from '../cart/cart.service';
import { CartDto } from '../DTOs/CartDto';
import { CartItemDto } from '../DTOs/CartItemDto';
import { CustomerDto } from '../DTOs/CustomerDto';
import { CustomersAddress } from '../DTOs/CustomersAddress';
import { OrderDetailDto } from '../DTOs/OrderDetailDto';
import { OrderDto } from '../DTOs/OrderDto';
import { OrderService } from '../orders/order.service';
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
  cart: CartDto = {};
  totalMoney = 0;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private message: MessageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      this.calculateTotalMoney();
      console.log(this.cart);
    });
    this.checkoutService.getAddressesByCustomerId(4).subscribe((res) => {
      this.addresses = res;
      if (this.addresses.length) {
        this.addressSelected = this.addresses.find(
          (address) => address.status === 1
        ) as CustomersAddress;
        this.onChangeAddressSelected(this.addressSelected.id);
      }
    });
  }
  onChangeAddressSelected(id: number) {
    this.addressSelected = this.addresses.find(
      (address) => address.id === id
    ) as CustomersAddress;
    this.order.address =
      this.addressSelected.detaiAddress +
      ', ' +
      this.addressSelected.ward +
      ', ' +
      this.addressSelected.district +
      ', ' +
      this.addressSelected.city;
  }
  submit() {
    this.order = {
      ...this.order,
      orderDetailDtos: this.cart.cartItemDtos?.map((cartItem) => ({
        priceSell: cartItem.productDetailCartDto?.price,
        productPrice: cartItem.productDetailCartDto?.price,
        amount: cartItem.amount,
        productDetailCartDto: {
          id: cartItem.productDetailCartDto?.id,
        },
        note: '',
      })) as OrderDetailDto[],
      quantity: this.cart.cartItemDtos?.length as number,
      totalMoney: this.cart.totalMoney as number,
      goodsValue: this.cart.totalMoney as number,
    };
    this.orderService.createOrder(this.order).subscribe();
  }
  calculateTotalMoney() {
    this.totalMoney = this.cart.cartItemDtos!.reduce(
      (b, a: CartItemDto) => b + a.productDetailCartDto!.price * a.amount,
      0
    );
  }
  order: OrderDto = {
    address: '',
    carrier: '',
    checkout: 0,
    customerDTO: {
      id: 4,
    } as CustomerDto,
    goodsValue: 0,
    id: 0,
    note: '',
    orderDetailDtos: [],
    orderStatus: 0,
    payStatus: 0,
    quantity: 0,
    recipientEmail: '',
    recipientName: '',
    recipientPhone: '',
    shipFee: 0,
    totalMoney: 0,
  };
}
