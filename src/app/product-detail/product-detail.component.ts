import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  amount: number = 0;
  productDetailSelected!: ProductDetailDto | null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private message: MessageService,
    private infoService: InfoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer;
      }
    });
    this.productDetailService.getProductById(productId).subscribe((product) => {
      this.product = product;
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

    let optionValuesSelected = this.product.optionDtos?.map((option) => {
      return option.optionValueDtos.find((optionValue) => optionValue.selected);
    }) as OptionValueDto[];

    if (!optionValuesSelected.some((o) => o === undefined)) {
      if (this.product.productDetailDtos.length == 1) {
        this.productDetailSelected = this.product.productDetailDtos[0];
      } else
        this.product.productDetailDtos.forEach((proDetail) => {
          if (
            proDetail.productVariantCombinationDtos!.every(
              (productVariantCombinationDto, i) =>
                optionValuesSelected[i].id ==
                productVariantCombinationDto.optionValueDto?.id
            )
          ) {
            this.productDetailSelected = proDetail;
          }
        });
      this.amount = this.productDetailSelected?.stock ? 1 : 0;
    } else {
      this.amount = 0;
      this.productDetailSelected = null;
    }
  }

  addToCart(checkout?: boolean) {
    if (this.customer) {
      if (this.productDetailSelected) {
        this.cartService
          .addToCart(this.customer.id!, {
            totalMoney: this.productDetailSelected.priceSell,
            amount: this.amount,
            productDetailCartDto: {
              id: this.productDetailSelected.id,
              price: this.productDetailSelected.priceSell,
              stock: 0,
            },
          })
          .subscribe((res: any) => {
            if (res) {
              if (checkout) this.router.navigate(['checkout']);
            }
          });
      } else {
        this.toastr.error('Vui lòng chọn phân loại');
      }
    } else {
      this.toastr.warning('Vui lòng đăng nhập');
      this.router.navigate(['login']);
    }
  }
  returnHome() {
    this.router.navigate(['home']);
  }
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
}
