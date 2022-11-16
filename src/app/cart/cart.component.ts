import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartDto } from 'src/app/DTOs/CartDto';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';
import { ProductDetailCartDto } from 'src/app/DTOs/ProductDetailCartDto';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartDto = {};
  cart_id = 1;
  totalMoney = 0;

  constructor(
    private cartService: CartService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      this.calculateTotalMoney();
      console.log(this.cart);
    });
    console.log(this.cart);
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
