import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { BehaviorSubject, lastValueFrom, Subscription } from 'rxjs';
import { InfoService } from 'src/service/infoCustomer.service';
import { SessionService } from 'src/service/session.service';
import { TokenService } from 'src/service/token.service';
import { customerStore } from '../customer.repository';
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
  customer: Customer | null = null;
  items: MenuItem[] = [
    {
      label: 'MobileGenz',
      icon: 'fas fa-store',
      routerLink: 'home',
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

  constructor(
    private sessionService: SessionService,
    private tokenService: TokenService,
    private infoService: InfoService
  ) {}
  subCustomer!: Subscription;
  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }
  ngOnInit() {
    this.subCustomer = customerStore.subscribe((res) => {
      if (res.customer) {
        this.customer = res.customer;
        this.items = this.deavtive();
      }
    });
  }

  showDialog() {
    this.display = true;
  }

  active() {
    return [
      {
        label: 'MobileGenz',
        icon: 'fas fa-store',
        routerLink: 'home',
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

  deavtive() {
    return [
      {
        label: 'MobileGenz',
        icon: 'fas fa-store',
        routerLink: 'home',
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
            routerLink: 'logout',
          },
          {
            label: 'Thông tin cá nhân',
            icon: 'pi pi-user',
            routerLink: 'profile',
          },
          {
            label: 'Giỏ hàng',
            icon: 'pi pi-user',
            routerLink: 'cart',
          },
          {
            label: 'Đơn hàng',
            icon: 'pi pi-user',
            routerLink: 'orders',
          },
        ],
      },
    ];
  }

  public logout() {
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('auth-user');
    window.localStorage.removeItem('id-account');
    this.infoService.setCustomer(null);
  }
}
