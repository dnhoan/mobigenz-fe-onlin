import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/service/infoCustomer.service';
import { CartService } from '../cart/cart.service';
import { customerStore } from '../customer.repository';
import { CartItemDto } from '../DTOs/CartItemDto';
import { OptionValueDto } from '../DTOs/OptionValueDto';
import { ProductDetailDto } from '../DTOs/ProductDetailDto';
import { ProductDto } from '../DTOs/ProductDto';
import { ProductVariantCombinationDto } from '../DTOs/ProductVariantCombinationDto';
import { CustomerDTO } from '../login/account.model';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: ProductDto;
  customer!: CustomerDTO;
  subCustomer!: Subscription;
  // currentProductDetail!: ProductDetailDto;
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
    private router: Router,
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private message: MessageService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.subCustomer = customerStore.subscribe((res) => {
      if (res.customer) {
        this.customer = res.customer;
      }
    });
    this.productDetailService.getProductById(productId).subscribe((product) => {
      this.product = product;
      console.log(this.product);
    });
  }
  selectOptionValue(
    i_option: number,
    i_optionValue: number,
    currentSelected: boolean
  ) {
    this.product.optionDtos![i_option].optionValueDtos =
      this.product.optionDtos![i_option].optionValueDtos.map((opv) => ({
        ...opv,
        selected: false,
      }));
    this.product.optionDtos![i_option].optionValueDtos[i_optionValue].selected =
      !currentSelected;
  }

  // lastOption: number = 0;
  // selectOptionValue(i_option: number, optionId: number, optionValueId: number) {
  //   console.log(this.product);

  //   let productDetails = this.product.productDetailDtos.filter((proDetail) => {
  //     let check =
  //       proDetail.productVariantCombinationDtos![i_option].optionValueDto!.id ==
  //       optionValueId;
  //     if (proDetail.productVariantCombinationDtos?.length == 2) {
  //       proDetail.productVariantCombinationDtos.forEach((p, i) => {
  //         if (i != i_option) {
  //           check =
  //             check &&
  //             p.optionValueDto?.id ==
  //               this.currentProductDetail.productVariantCombinationDtos![i]
  //                 .optionValueDto!.id;
  //         }
  //       });
  //     }
  //     return check;
  //   });
  //   this.currentProductDetail = productDetails[0];
  // }

  addToCart(checkout?: boolean) {
    let optionValuesSelected = this.product.optionDtos?.map((option) => {
      return option.optionValueDtos.find((optionValue) => optionValue.selected);
    }) as OptionValueDto[];
    let productDetail = {
      priceSell: 0,
      sku: '',
      image: '',
    } as ProductDetailDto;
    this.product.productDetailDtos.forEach((proDetail) => {
      if (
        proDetail.productVariantCombinationDtos!.every(
          (productVariantCombinationDto, i) =>
            optionValuesSelected[i].id ==
            productVariantCombinationDto.optionValueDto?.id
        )
      ) {
        productDetail = proDetail;
        console.log(productDetail);
      }
    });
    this.cartService
      .addToCart(this.customer.id!, {
        totalMoney: productDetail.priceSell,
        amount: 1,
        productDetailCartDto: {
          id: productDetail.id,
          price: productDetail.priceSell,
          stock: 0,
        },
      })
      .subscribe((res: any) => {
        if (res) {
          if (checkout) this.router.navigate(['checkout']);
        }
      });
    // console.log(this.currentProductDetail);
  }
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
}
