import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

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
    ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formChangePass = this.fb.group({
      otp: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    });
  }

  ChangePass() {}

  back(){
    this.router.navigate(['/forgot'])
  }
}
