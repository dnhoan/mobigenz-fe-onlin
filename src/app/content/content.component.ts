import { Component, OnInit } from '@angular/core';
import { MockProductsService } from "./mock-products.service";
import { ProductDto } from "src/app/content/product-dto";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  products: ProductDto[] = [];

  constructor(
    private productService: MockProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(
        (response: any) => {
          this.products = response
        });
  }

}
