import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../cart/cart.service';
import { CartItemDto } from '../DTOs/CartItemDto';
import { OptionValueDto } from '../DTOs/OptionValueDto';
import { ProductDetailDto } from '../DTOs/ProductDetailDto';
import { ProductDto } from '../DTOs/ProductDto';
import { ProductVariantCombinationDto } from '../DTOs/ProductVariantCombinationDto';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: ProductDto;
  currentProductDetail!: ProductDetailDto;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.productDetailService.getProductById(productId).subscribe((product) => {
      this.product = product;
      console.log(this.product);

      this.currentProductDetail = this.product.productDetailDtos[0];
      console.log(this.currentProductDetail);
    });
  }
  lastOption: number = 0;
  selectOptionValue(i_option: number, optionId: number, optionValueId: number) {
    console.log(this.product);

    let productDetails = this.product.productDetailDtos.filter((proDetail) => {
      let check =
        proDetail.productVariantCombinationDtos![i_option].optionValueDto!.id ==
        optionValueId;
      if (proDetail.productVariantCombinationDtos?.length == 2) {
        proDetail.productVariantCombinationDtos.forEach((p, i) => {
          if (i != i_option) {
            check =
              check &&
              p.optionValueDto?.id ==
                this.currentProductDetail.productVariantCombinationDtos![i]
                  .optionValueDto!.id;
          }
        });
      }
      return check;
    });
    this.currentProductDetail = productDetails[0];
  }

  addToCart() {
    this.cartService
      .addToCart(4, {
        totalMoney: this.currentProductDetail.priceSell,
        amount: 1,
        productDetailCartDto: {
          id: this.currentProductDetail.id,
          price: this.currentProductDetail.priceSell,
          stock: 0,
        },
      })
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
        }
        console.log(res);
      });
    console.log(this.currentProductDetail);
  }
}
