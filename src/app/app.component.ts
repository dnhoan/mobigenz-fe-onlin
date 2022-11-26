import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/service/account.service';
import { CustomerService } from 'src/service/customer.service';
import { InfoService } from 'src/service/infoCustomer.service';
import { customerStore } from './customer.repository';
import { CustomerDTO } from './login/account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mobigenz-fe-online';
  constructor(
    private primengConfig: PrimeNGConfig,
    private infoService: InfoService,
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    await this.infoService.getCustomer();
    this.primengConfig.ripple = true;
  }
}
