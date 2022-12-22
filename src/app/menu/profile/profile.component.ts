import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { customerStore } from 'src/app/customer.repository';
import { Customer, CustomerDTO } from 'src/app/login/account.model';
import { CustomerService } from 'src/service/customer.service';
import { InfoService } from 'src/service/infoCustomer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formProfile!: FormGroup;
  customer: CustomerDTO = {};
  subCustomer!: Subscription;
  submit = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    readonly router: Router,
    private toastr: ToastrService,
    private infoService: InfoService
  ) {}

  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }

  ngOnInit() {
    this.customerService.getCustomers();
    this.initForm();
    console.log(customerStore);

    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer as CustomerDTO;
        this.fillValueForm();
      }
    });
  }

  initForm() {
    this.formProfile = this.fb.group({
      id: null,
      customerName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),
        ],
      ],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: [''],
      customerType: [''],
      citizenIdentifyCart: ['', [Validators.pattern('^[0-9]{12}$')]],
      status: [''],
    });
  }

  saveCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe();
  }

  fillValueForm() {
    let bd;
    if (this.customer.birthday) bd = this.formatDate(this.customer.birthday);
    else bd = null;
    this.formProfile.patchValue({
      id: this.customer.id,
      customerName: this.customer.customerName,
      phoneNumber: this.customer.phoneNumber,
      birthday: bd,
      gender: this.customer.gender,
      email: this.customer.email,
      customerType: this.customer.customerType,
      citizenIdentifyCart: this.customer.citizenIdentifyCart,
      status: this.customer.status,
    });
  }

  update() {
    this.submit = true;
    if (this.formProfile.valid) {
      this.addValueCustomer();
      this.customerService.updateCustomerOnline(this.customer).subscribe(
        (res) => {
          this.toastr.success('Cập nhật khách hàng thành công!');
          this.customerService.getCustomers();
          return;
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  addValueCustomer() {
    this.customer.id = this.formProfile.value.id;
    this.customer.customerName = this.formProfile.value.customerName;
    this.customer.phoneNumber = this.formProfile.value.phoneNumber;
    this.customer.birthday = this.formProfile.value.birthday;
    this.customer.gender = this.formProfile.value.gender;
    this.customer.email = this.formProfile.value.email;
    this.customer.customerType = this.formProfile.value.customerType;
    this.customer.citizenIdentifyCart =
      this.formProfile.value.citizenIdentifyCart;
    this.customer.status = this.formProfile.value.status;
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  reFormatDate(date: Date) {
    var d = new Date(date),
      month = '' + d.getMonth(),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
