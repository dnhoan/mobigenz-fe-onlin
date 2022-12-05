import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/DTOs/ProductDto';
import { ProductsService } from './products.service';
import { CartComponent } from 'src/app/cart/cart.component';
import { SelectItem } from 'primeng/api';
import { ManufacturerDto } from 'src/app/DTOs/ManufacturerDto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  sortOptions!: SelectItem[];
  sortKey!: string;
  min_price: number = 0;
  max_price: number = 999999999;
  sortOrder!: number;
  manufacturerSelected: number = 0;
  searchTerm: string = '';
  sortField!: string;
  sortPriceIncrease: boolean = true;
  manufacturers: ManufacturerDto[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getManufacturers().subscribe((res) => {
      if (res) {
        this.manufacturers = res;
      }
    });
    this.searchProduct();
    this.sortOptions = [
      { label: 'Tăng dần', value: true },
      { label: 'Giảm dần', value: false },
    ];
  }
  search(event: any) {
    this.searchProduct();
  }
  onSortChange(event: any) {
    this.searchProduct();
  }
  onChangeManufacturer(event: any) {
    this.searchProduct();
  }
  clearFilterManufacturer(event: any) {
    this.manufacturerSelected = 0;
    this.searchProduct();
  }
  searchProduct() {
    this.productService
      .searchProductsShop(
        this.searchTerm,
        this.min_price,
        this.max_price,
        this.manufacturerSelected,
        this.sortPriceIncrease
      )
      .subscribe((res) => {
        this.products = res;
      });
  }
}
