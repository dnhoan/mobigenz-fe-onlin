import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    readonly router: Router,
    private toastr: ToastrService,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.initForm();
    this.infoService.customer$.subscribe((value) => {
      this.customer = value;
      if (this.customer) this.fillValueForm();
    });
  }

  initForm() {
    this.formProfile = this.fb.group({
      customerName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      customerType: ['', [Validators.required]],
      citizenIdentifyCart: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  saveCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe();
  }

  fillValueForm() {
    this.formProfile.patchValue({
      id: this.customer.id,
      customerName: this.customer.customerName,
      phoneNumber: this.customer.phoneNumber,
      birthday: this.customer.birthday,
      gender: this.customer.gender,
      email: this.customer.email,
      customerType: this.customer.customerType,
      citizenIdentifyCart: this.customer.citizenIdentifyCart,
      status: this.customer.status,
    });
    console.log(this.customer.id);
  }

  update() {
    this.addValueCustomer();
    console.log(this.addValueCustomer());
    console.log(this.customer);
    this.customerService.updateCustomer(this.customer).subscribe((res) => {
      this.toastr.success('Cập nhật thông tin thành công!');
      this.router.navigate(['/home']).then((r) => console.log(r));
    });
  }

  addValueCustomer() {
    console.log(this.formProfile.value);
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
}
