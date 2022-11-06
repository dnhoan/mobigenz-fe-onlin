import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  images = [
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667029337004?alt=media&token=1fbf5921-c469-4fef-a00f-d92080d7666b',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667222407907?alt=media&token=e1ba2ba5-14ff-45e6-8fc8-900e1ca33227',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404370071?alt=media&token=364d2352-3052-451f-a80d-d459ae23248e',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404367116?alt=media&token=5a4f8ec5-1e12-4dbb-8959-f04a8b1d83db',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667029337004?alt=media&token=1fbf5921-c469-4fef-a00f-d92080d7666b',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667222407907?alt=media&token=e1ba2ba5-14ff-45e6-8fc8-900e1ca33227',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404370071?alt=media&token=364d2352-3052-451f-a80d-d459ae23248e',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404367116?alt=media&token=5a4f8ec5-1e12-4dbb-8959-f04a8b1d83db',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667029337004?alt=media&token=1fbf5921-c469-4fef-a00f-d92080d7666b',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667222407907?alt=media&token=e1ba2ba5-14ff-45e6-8fc8-900e1ca33227',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404370071?alt=media&token=364d2352-3052-451f-a80d-d459ae23248e',
    'https://firebasestorage.googleapis.com/v0/b/mobigenz-327dd.appspot.com/o/product_images%2F1667404367116?alt=media&token=5a4f8ec5-1e12-4dbb-8959-f04a8b1d83db',
  ];
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
    private productDetailService: ProductDetailService
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
}
