import { ProductDetailCartDto } from "./ProductDetailCartDto";

export interface CartItemDto {
    id?: number,
    totalMoney?: number,
    amount?: number,
    mtime?: string,
    productDetailCartDto?: ProductDetailCartDto
}