import { ProductVariantCombinationDto } from './ProductVariantCombinationDto';

export interface ProductDetailDto {
  id?: number;
  price?: number;
  priceSell: number;
  sku: string;
  image: string;
  stock: number;
  productVariantCombinationDtos?: ProductVariantCombinationDto[];
}
