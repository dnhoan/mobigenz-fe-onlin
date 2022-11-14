export interface CustomerDto {
  id: number;
  birthday: string;
  citizenIdentifyCart: string;
  ctime: string;
  customerName: string;
  customerType: number;
  email: string;
  gender: number;
  image: string;
  mtime: string;
  phoneNumber: string;
  account: {
    id: number;
  };
  status: number;
}
