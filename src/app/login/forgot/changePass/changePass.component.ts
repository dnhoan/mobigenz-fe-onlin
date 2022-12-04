import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotService } from '../forgot.service';

@Component({
  selector: 'app-changePass',
  templateUrl: './changePass.component.html',
  styleUrls: ['./changePass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  formChangePass!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private forgotService: ForgotService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.email
  }

  initForm() {
    this.formChangePass = this.fb.group({
      isOtp: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    });
  }

   email = localStorage.getItem('email');

  ChangePass(email: any,otp: string, password: any, repassword: any) {
    email= this.email
    this.forgotService.changepass(email, otp, password, repassword).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Thay đổi mật khẩu thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }

  back() {
    this.router.navigate(['/forgot']);
  }
}
