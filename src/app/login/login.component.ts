import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/service/account.service';
import { AuthService } from 'src/service/auth.service';
import { CustomerService } from 'src/service/customer.service';
import { SessionService } from 'src/service/session.service';
import { TokenService } from 'src/service/token.service';
import { Account, Customer } from './account.model';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { InfoService } from 'src/service/infoCustomer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  isSubmitted = false;
  // account: Account ={};
  roles: string[] = [];
  account: Account = {};
  isLoggedIn = false;
  urlCustomer = 'http://localhost:9090/api/getCustomerByAccountId=accountId?';
  email!: String;
  customer: Customer = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private sessionService: SessionService,
    private accountService: AccountService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private infoService: InfoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }
    this.initForm();
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  addMultiple() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService',
      },
      {
        severity: 'info',
        summary: 'Info Message',
        detail: 'Via MessageService',
      },
    ]);
  }

  clear() {
    this.messageService.clear();
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberme: [false, [Validators.required]],
    });
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required]],
      phoneNumber: [''],
    });
  }

  // saveAccount() {

  // }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        (data) => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.accountService.getDecodedAccessToken();
          this.tokenService.saveAccount(jwtDecode.sub);
          const role = jwtDecode.auth.split(',');
          // const email = this.sessionService.getItemCus('auth-user');
          this.infoService.getCustomer();
          console.log(this.infoService.getCustomer());

          // this.customerService
          //   .getCustomerByEmail(jwtDecode.sub)
          //   .subscribe((res) => {
          // //     localStorage.setItem('id-account', res.data.account.id);
          //   });
          if (localStorage.getItem('auth-token')) {
            this.toastr.success('Đăng nhập thành công!');
            this.router.navigate(['/home']);
            return;
          }
        },
        (error) => {
          this.router.navigate(['/login']);
          this.toastr.error('Tài khoản hoặc mật khẩu không chính xác!');
        }
      );
    }
  }

  registerAccount() {
    this.addValueAccount();
    this.accountService.register(this.account).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Đăng ký thành công');
        this.router.navigate(['/login']);
      }
    });
  }

  forgotPassword() {
    this.router.navigate(['forgot']).then((r) => console.log(r));
  }

  addValueAccount() {
    this.account.email = this.formRegister.value.email;
    this.account.password = this.formRegister.value.password;
    this.account.phoneNumber = this.formRegister.value.phoneNumber;
    // this.account.roleid = { id: this.formRegister.value.role };
    // if (this.formRegister.value.status == 1) {
    //   this.account.status = 1;
    // } else {
    //   this.account.status = 0;
    // }
  }

  // getByUserName(){
  //   const accountId = this.sessionService.getItem('id-account');
  //    this.customerService.getCustomerByAccountId(accountId).subscribe(
  //     (res)=>{
  //      console.log(res.data.customers);
  //      window.localStorage.setItem("customer_id",res.data.customers.id ),
  //      window.localStorage.setItem("customer_name",res.data.customers.customerName ),
  //      window.localStorage.setItem("customer_email",res.data.customers.email ),
  //      window.localStorage.setItem("customer_phone",res.data.customers.phoneNumber )
  //     }

  //   )
  // }
}
