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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });
    console.log(this.cart);
  }
}
