import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/service/account.service';
import { AuthService } from 'src/service/auth.service';
import { InfoService } from 'src/service/infoCustomer.service';
import { SessionService } from 'src/service/session.service';
import { TokenService } from 'src/service/token.service';
import { ForgotService } from './forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  formForgot!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private readonly router: Router,
    private forgotService: ForgotService,
  ) { }
  ngOnInit(){
    this.formForgot = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  public sendOTP(){
    this.forgotService.sendOtp(this.formForgot.value.email).subscribe(
      (res)=> {
        this.router.navigate(['/changePass']);
        this.toastr.success("OTP đã gửi đến email của bạn!")
        localStorage.setItem('id',res.object.id);
      },
      (error) => {
        console.log(error)
        this.toastr.error("Email không tồn tại trong hệ thống, vui lòng kiểm tra lại!");
      }
    );
  }

  back(){
    this.router.navigate(['/login']);
  }
}
