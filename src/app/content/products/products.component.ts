import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/DTOs/ProductDto';
import { ProductsService } from './products.service';
import { CartComponent } from 'src/app/cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
