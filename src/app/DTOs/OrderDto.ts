import { CustomerDto } from './CustomerDto';
import { OrderDetailDto } from './OrderDetailDto';

export interface OrderDto {
  id: number;
  recipientEmail: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  goodsValue: number;
  quantity: number;
  totalMoney: number;
  shipFee?: number;
  shipDate?: string;
  carrier: string;
  checkout: number;
  payStatus: number;
  orderStatus: number;
  customerDTO: CustomerDto;
  orderDetailDtos: OrderDetailDto[];
  transactionDto?: {};
  note: string;
  ctime?: string;
  mtime?: string;
}
