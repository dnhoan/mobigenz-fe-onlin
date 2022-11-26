import { ProductDetailCartDto } from './ProductDetailCartDto';

export interface OrderDetailDto {
  id?: number;
  priceSell?: number;
  productPrice?: number;
  amount: number;
  productDetailCartDto: ProductDetailCartDto;
  note: string;
  ctime?: string;
  mtime?: string;
}
