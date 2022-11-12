import { ProductDetailCartDto } from './ProductDetailCartDto';

export interface CartItemDto {
  id?: number;
  totalMoney?: number;
  amount: 0;
  mtime?: string;
  productDetailCartDto?: ProductDetailCartDto;
}
