import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartDto } from 'src/app/DTOs/CartDto';
import { CartItemDto } from 'src/app/DTOs/CartItemDto';
import { ProductDetailCartDto } from 'src/app/DTOs/ProductDetailCartDto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartDto = {
    // id: 1,
    // totalMoney: 1,
    // itemsAmount: 1,
    // cartItemDtos: [
    //   {
    //     id: 1,
    //     amount: 1,
    //     productDetailCartDto: {
    //       id: 1,
    //       price: 111.0,
    //       sku: "Xanh lá",
    //       image: "https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667924139980?alt=media&token=66e5049f-5fdb-4304-a3ef-e874a7040245, https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667924151239?alt=media&token=1bae9674-0397-4802-90af-5892a50cfc08",
    //       stock: 1,
    //       productName: "RandomName1"
    //     }
    //   },
    //   {
    //     id: 2,
    //     amount: 1,
    //     productDetailCartDto: {
    //       id: 2,
    //       price: 123.0,
    //       sku: "Đỏ",
    //       image: "https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667924199522?alt=media&token=cd4f6cd6-1e42-4fc5-b3d5-5524e0c62f34",
    //       stock: 2,
    //       productName: "RandomName2"
    //     }
    //   }
    // ]
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });
    console.log(this.cart);
  }

}
