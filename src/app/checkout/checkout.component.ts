import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/service/infoCustomer.service';
import { CartService } from '../cart/cart.service';
import { customerStore } from '../customer.repository';
import { CartDto } from '../DTOs/CartDto';
import { CartItemDto } from '../DTOs/CartItemDto';
import { CustomerDto } from '../DTOs/CustomerDto';
import { CustomersAddress } from '../DTOs/CustomersAddress';
import { OrderDetailDto } from '../DTOs/OrderDetailDto';
import { OrderDto } from '../DTOs/OrderDto';
import { CustomerDTO } from '../login/account.model';
import { OrderService } from '../orders/order.service';
import { AddressService } from './address/address.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isDelivery: number = 0;
  addresses: CustomersAddress[] = [];
  addressSelected!: CustomersAddress | null;
  checked = false;
  city!: string;
  cart: CartDto = {};
  goodsValue = 0;
  customer!: CustomerDTO;
  isShowDetailAddress = false;
  i_address: number = -1;
  isCreateOrderSuccess = false;
  addressEdit: CustomersAddress = {
    city: '',
    detailAddress: '',
    district: '',
    id: 0,
    status: 1,
    ward: '',
  };
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
    private message: MessageService,
    private orderService: OrderService,
    private infoService: InfoService,
    private addressService: AddressService,
    private confirmationService: ConfirmationService
  ) {}
  subCustomer!: Subscription;
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
  ngOnInit() {
    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer as CustomerDTO;
        this.cartService
          .getCartByCustomerId(this.customer.id!)
          .subscribe((cart) => {
            this.cart = cart;
            this.calculateTotalMoney();
          });
        this.checkoutService
          .getAddressesByCustomerId(this.customer.id!)
          .subscribe((res) => {
            this.addresses = res;
            if (this.addresses.length) {
              this.addressSelected = this.addresses.find(
                (address) => address.status === 1
              ) as CustomersAddress;
              this.onChangeAddressSelected(this.addressSelected.id);
            }
          });
      }
    });
  }
  updateAddress(event: any) {
    this.addressService
      .saveAddressByCustomerId(this.customer.id!, event)
      .subscribe((res) => {
        if (res) {
          if (this.i_address >= 0) {
            this.addresses[this.i_address] = res;
          } else {
            this.addresses.push(res);
            this.addressSelected = res;
            this.onChangeAddressSelected(res.id);
          }
          this.isShowDetailAddress = false;
          this.i_address = -1;
        }
      });
  }
  deleteAddress(address_id: number, i_address: number) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa địa chỉ này không?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addressService.deleteAddress(address_id).subscribe((res) => {
          if (res) {
            this.addresses.splice(i_address, 1);
            if (this.addresses.length) {
              this.addressSelected = this.addresses[0];
              this.getFeeShip();
            } else {
              this.addressSelected = null;
              this.order.shipFee = 0;
            }
          }
        });
      },
      reject: () => {},
    });
  }
  onChangeAddressSelected(id: number) {
    this.addressSelected = this.addresses.find(
      (address) => address.id === id
    ) as CustomersAddress;
    this.order.address =
      this.addressSelected.detailAddress +
      ', ' +
      this.addressSelected.ward +
      ', ' +
      this.addressSelected.district +
      ', ' +
      this.addressSelected.city;
    this.getFeeShip();
  }
  submit() {
    this.calculateTotalMoney();
    if (this.isDelivery == 0) {
      this.order.shipFee = 0;
    }
    this.order = {
      ...this.order,
      customerDTO: { id: this.customer.id! } as CustomerDto,
      orderDetailDtos: this.cart.cartItemDtos?.map((cartItem) => ({
        priceSell: cartItem.productDetailCartDto?.price,
        productPrice: cartItem.productDetailCartDto?.price,
        amount: cartItem.amount,
        productDetailCartDto: {
          id: cartItem.productDetailCartDto?.id,
          price: cartItem.productDetailCartDto?.price,
          image: cartItem.productDetailCartDto?.image,
          productName: cartItem.productDetailCartDto?.productName,
          sku: cartItem.productDetailCartDto?.sku,
        },
        note: '',
      })) as OrderDetailDto[],
      quantity: this.cart.cartItemDtos?.length as number,
      totalMoney: (this.goodsValue + this.order.shipFee!) as number,
      goodsValue: this.goodsValue as number,
      delivery: this.isDelivery,
      purchaseType: 1,
    };
    this.orderService.createOrder(this.order).subscribe((res) => {
      if (res) {
        this.order = { ...res, orderDetailDtos: this.order.orderDetailDtos };
        this.isCreateOrderSuccess = true;
      }
    });
  }
  calculateTotalMoney() {
    this.goodsValue = this.cart.cartItemDtos!.reduce(
      (b, a: CartItemDto) => b + a.productDetailCartDto!.price * a.amount,
      0
    );
  }
  getFeeShip() {
    this.checkoutService
      .getFeeShip(
        this.order.address,
        this.addressSelected?.city!,
        this.addressSelected?.district!
      )
      .subscribe((res) => {
        this.order.shipFee = res;
      });
  }
  showAddressDetail(i_address: number) {
    this.i_address = i_address;
    if (i_address >= 0) {
      this.addressEdit = { ...this.addresses[i_address] };
    }
    this.isShowDetailAddress = true;
  }
  returnHome() {
    this.router.navigate(['home']);
  }
  returnOrders() {
    this.router.navigate(['orders']);
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
    purchaseType: 1,
  };
}
