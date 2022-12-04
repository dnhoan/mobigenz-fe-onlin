import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartDto } from 'src/app/DTOs/CartDto';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';
import { ProductDetailCartDto } from 'src/app/DTOs/ProductDetailCartDto';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/service/infoCustomer.service';
import { CustomerDTO } from '../login/account.model';
import { customerStore } from '../customer.repository';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartDto = {};
  cart_id = 1;
  totalMoney = 0;
  subCustomer!: Subscription;
  customer!: CustomerDTO;

  constructor(
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private infoService: InfoService
  ) {}
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
  ngOnInit() {
    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer;
        this.cartService
          .getCartByCustomerId(this.customer.id!)
          .subscribe((cart) => {
            this.cart = cart;
            this.calculateTotalMoney();
          });
      }
    });
  }

  deleteCartItem(cart_item_id: any, i_cart_item: number) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cartService.deleteCartItem(cart_item_id).subscribe((res) => {
          console.log(res);
          if (res) {
            this.cart.cartItemDtos?.splice(i_cart_item, 1);
            this.calculateTotalMoney();
          }
        });
      },
      reject: () => {},
    });
  }
  calculateTotalMoney() {
    this.totalMoney = this.cart.cartItemDtos!.reduce(
      (b, a: CartItemDto) => b + a.productDetailCartDto!.price * a.amount,
      0
    );
  }
  // addCartItem(cart_id: any, cart_item_id: any) {
  //   let cartItem: CartItemDto = <CartItemDto>{};
  //   cart_id = this.cart_id;
  //   cartItem.id = cart_item_id;
  //   this.cartService.addCartItem(cartItem);
  //   this.cartService.getCart();
  // }

  saveCartItem(value: any, i_cart_item: number) {
    this.cartService
      .updateCartItem(this.cart.cartItemDtos![i_cart_item], this.cart.id!)
      .subscribe();
  }
}
