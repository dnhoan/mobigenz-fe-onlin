import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomersAddress } from 'src/app/DTOs/CustomersAddress';
export interface Address {
  name: string;
  code: number;
}
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input('address') address!: CustomersAddress;
  @Output() newAddress = new EventEmitter<CustomersAddress>();
  initAdress = {
    code: 0,
    name: '',
  };
  baseUrl = 'https://provinces.open-api.vn/api';
  isVisibleModal = false;
  provinces: Address[] = [];
  districts: Address[] = [];
  warts: Address[] = [];
  addressDetail = '';
  provinceSelected: Address = this.initAdress;
  districtSelected!: Address;
  wartSelected!: Address;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${this.baseUrl}/p`).subscribe((res: any) => {
      this.provinces = res.map((r: any) => ({ code: r.code, name: r.name }));
    });
  }
  save() {
    this.newAddress.emit(this.address);
  }

  changeProvince() {
    this.districts = [];
    this.districtSelected = this.initAdress;
    this.warts = [];
    this.wartSelected = this.initAdress;
    if (this.provinceSelected) {
      this.http
        .get(`${this.baseUrl}/d/search/?p=${this.provinceSelected.code}&q=*`)
        .subscribe((res: any) => {
          this.districts = res.map((r: any) => ({
            code: r.code,
            name: r.name,
          }));
          this.address.district = this.districtSelected.name;
        });
    }
    this.address.city = this.provinceSelected.name;
  }
  changeDistrict() {
    this.warts = [];
    this.wartSelected = this.initAdress;
    if (this.districtSelected) {
      this.http
        .get(
          `${this.baseUrl}/w/search/?d=${this.districtSelected.code}&p=${this.provinceSelected.code}&q=*`
        )
        .subscribe((res: any) => {
          this.warts = res.map((r: any) => ({ code: r.code, name: r.name }));
          this.wartSelected = this.warts[0];
        });
    }
    this.address.district = this.districtSelected.name;
  }
  changeWart() {
    this.address.ward = this.wartSelected.name;
  }
}
