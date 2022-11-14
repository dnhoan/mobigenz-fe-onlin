import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartDto } from 'src/app/DTOs/CartDto';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';
import { ProductDetailCartDto } from 'src/app/DTOs/ProductDetailCartDto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartDto = {};
  cart_id = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });
    console.log(this.cart);
  }

  deleteCartItem(cart_item_id: any) {
    this.cartService.deleteCartItem(cart_item_id).subscribe();
  }

  addCartItem(cart_id: any, cart_item_id: any) {
    let cartItem: CartItemDto = <CartItemDto>{};
    cart_id = this.cart_id;
    cartItem.id = cart_item_id;
    this.cartService.addCartItem(cartItem);
    this.cartService.getCart();
  }

  saveCartItem(cart_item_id: any, cart_item_amount: any) {
    let cartItem: CartItemDto = <CartItemDto>{};
    cartItem.id = cart_item_id;
    cartItem.amount = cart_item_amount;
    this.cartService.updateCartItem(cartItem);
  }
}
