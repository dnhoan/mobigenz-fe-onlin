import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/DTOs/ProductDto';
import { ProductsService } from './products.service';
import { CartComponent } from 'src/app/cart/cart.component';
import { SelectItem } from 'primeng/api';
import { ManufacturerDto } from 'src/app/DTOs/ManufacturerDto';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subscription,
  switchMap,
} from 'rxjs';

export interface SearchProduct {
  searchTerm: string;
  min_price: number;
  max_price: number;
  manufacturerSelected: number;
  sortPriceIncrease: boolean;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  sortOptions!: SelectItem[];
  sortKey!: string;
  sortOrder!: number;
  sortField!: string;
  manufacturers: ManufacturerDto[] = [];
  subSearchProduct!: Subscription;
  searchProduct: SearchProduct = {
    searchTerm: '',
    min_price: 0,
    max_price: 999999999,
    manufacturerSelected: 0,
    sortPriceIncrease: true,
  };
  searchChange$ = new BehaviorSubject<SearchProduct>(this.searchProduct);
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getManufacturers().subscribe((res) => {
      if (res) {
        this.manufacturers = res;
      }
    });
    this.subSearchProduct = this.searchChange$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((res) => {
          return this.productService.searchProductsShop(res);
        })
      )
      .subscribe((res: any) => {
        this.products = res;
      });
    this.sortOptions = [
      { label: 'Tăng dần', value: true },
      { label: 'Giảm dần', value: false },
    ];
  }
  search(value: any) {
    if (value) {
      this.searchChange$.next({ ...this.searchProduct });
    } else {
    }
  }
  onSortChange(event: any) {
    console.log(event);

    this.searchChange$.next({ ...this.searchProduct });
  }
  onChangeManufacturer(event: any) {
    this.searchChange$.next({ ...this.searchProduct });
  }
  clearFilterManufacturer(event: any) {
    this.searchProduct.manufacturerSelected = 0;
    this.searchChange$.next({ ...this.searchProduct });
  }
  ngOnDestroy() {
    this.subSearchProduct.unsubscribe();
  }
}
