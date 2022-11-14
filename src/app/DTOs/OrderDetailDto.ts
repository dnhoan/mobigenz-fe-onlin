export interface OrderDetailDto {
  id?: number;
  priceSell?: number;
  productPrice?: number;
  amount?: number;
  productDetailDto: {
    id: number;
  };
  note: string;
  ctime?: string;
  mtime?: string;
}
