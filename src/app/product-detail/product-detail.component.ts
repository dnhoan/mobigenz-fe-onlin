import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from '../DTOs/ProductDto';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: ProductDto;
  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.productDetailService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });
  }
}
