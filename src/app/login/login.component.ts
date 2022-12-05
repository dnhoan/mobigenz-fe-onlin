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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { customerStore } from '../customer.repository';
import { Subscription } from 'rxjs';

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
  closeResult = '';
  // account: Account ={};
  roles: string[] = [];
  account: Account = {};
  isLoggedIn = false;
  urlCustomer = 'http://localhost:9090/api/getCustomerByAccountId=accountId?';
  email!: String;
  customer: Customer = {};
  submit = false;
  subCustomer!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private modalService: NgbModal,
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

  open(content: any) {
    this.submit = false;
    this.initForm();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(error: any): string {
    if (error === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (error === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${error}`;
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberme: [true, []],
    });
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      repassword: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),
        ],
      ],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        (data) => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.accountService.getDecodedAccessToken();
          console.log(jwtDecode);

          this.tokenService.saveAccount(jwtDecode.sub);
          const role = jwtDecode.auth.split(',');
          this.infoService.getCustomer();
          console.log(this.infoService.getCustomer());
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
    if (!this.formRegister.valid) {
      this.submit = true;
      return;
    }
    if (
      this.formRegister.value.password != this.formRegister.value.repassword
    ) {
      this.toastr.error('Mật khẩu xác nhận phải trùng khớp!');
      return;
    } else {
      this.addValueAccount();
      this.accountService.register(this.account).subscribe(
        (res) => {
          this.toastr.success('Đăng ký tài khoản thành công!');
          this.modalService.dismissAll();
        },
        (error) => {
          if (error.error.message === 'Email đã tồn tại!') {
            this.toastr.error(error.error.message);
            return;
          }
          if (error.error.message === 'Số điện thoại đã tồn tại!') {
            this.toastr.error(error.error.message);
            return;
          }
          if (error.error.message === 'Đăng ký thất bại!') {
            this.toastr.error(error.error.message);
            return;
          }
        }
      );
    }
  }

  forgotPassword() {
    this.router.navigate(['forgot']).then((r) => console.log(r));
  }

  addValueAccount() {
    this.account.email = this.formRegister.value.email;
    this.account.password = this.formRegister.value.password;
    this.account.phoneNumber = this.formRegister.value.phoneNumber;
  }
}
