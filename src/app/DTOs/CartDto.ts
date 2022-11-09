import { CartItemDto } from "./CartItemDto";

export interface CartDto {
    id?: number,
    totalMoney?: number,
    itemsAmount?: number,
    mtime?: string,
    cartItemDtos?: CartItemDto[]
}