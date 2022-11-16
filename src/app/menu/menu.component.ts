import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { BehaviorSubject } from 'rxjs';
import { InfoService } from 'src/service/infoCustomer.service';
import { SessionService } from 'src/service/session.service';
import { TokenService } from 'src/service/token.service';
import { Customer } from '../login/account.model';

interface AccountOps {
  name: string;
  code: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  account!: AccountOps[];
  display: boolean = false;
  selectedOps!: AccountOps;
  isLogined!: boolean;
  customer:Customer | null = null;
  items!: MenuItem[];

  constructor(
    private sessionService: SessionService,
    private tokenService: TokenService,
    private infoService: InfoService
  ) {}

  ngOnInit() {
   this.infoService.getCustomer();
    this.infoService.customer.subscribe(value =>{
          this.customer = value;
          console.log(value)
           this.items =  this.customer?this.deavtive():this.active();
           console.log(this.customer?.customerName);
   })


  }

  showDialog() {
    this.display = true;
  }


 active(){
 return  [
    {
      label: 'MobileGenz',
      icon: 'fas fa-store',
    },
    {
      label: 'Home',
      icon: '',
      routerLink: 'home',
    },
    {
      label: 'About',
      icon: '',
    },
    {
      label: 'Contact',
      icon: '',
    },
    {
      label: 'Đăng nhập',
      icon: 'pi pi-sign-in',
      routerLink: 'login',
    },
  ];
 }

 deavtive(){
  return [
    {
      label: 'MobileGenz',
      icon: 'fas fa-store',
    },
    {
      label: 'Home',
      icon: '',
      routerLink: 'home',
    },
    {
      label: 'About',
      icon: '',
    },
    {
      label: 'Contact',
      icon: '',
    },
    {
      label: this.customer!.customerName,
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Đăng xuất',
          icon: 'pi pi-fw pi-power-off',
          command: (event?: any) => this.logout(),
          routerLink:'logout'
        },
        {
          label: 'Thông tin cá nhân',
          icon: 'pi pi-user',
        },

      ],
    },
  ];
 }

 public logout(){
  window.localStorage.removeItem("auth-token");
  window.localStorage.removeItem("auth-user");
  window.localStorage.removeItem("id-account");
  this.infoService.setCustomer(null);
 }


}
