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
  submit = false;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private forgotService: ForgotService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formChangePass = this.fb.group({
      isOtp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
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
    });
  }

  email = localStorage.getItem('email');

  ChangePass(email: any, otp: string, password: any, repassword: any) {
    email = this.email;
    this.submit = true;
    if (this.formChangePass.valid) {
      if(this.formChangePass.value.password != this.formChangePass.value.repassword){
        this.toastr.error("Mật khẩu xác nhận phải trùng khớp!");
        return
      }else{
      this.forgotService.changepass(email, otp, password, repassword).subscribe(
        (res) => {
          localStorage.clear();
          this.toastr.success('Thay đổi mật khẩu thành công');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }
}

  back() {
    this.router.navigate(['/forgot']);
  }
}
