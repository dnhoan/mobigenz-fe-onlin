import { Component } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f0a5bca015a68d44ece7869f65e5357915c03e37
import { PrimeNGConfig } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/service/account.service';
import { CustomerService } from 'src/service/customer.service';
import { InfoService } from 'src/service/infoCustomer.service';
import { customerStore } from './customer.repository';
import { CustomerDTO } from './login/account.model';
<<<<<<< HEAD
>>>>>>> f0a5bca (fix luồng bán hàng + fix get info customer)
=======
>>>>>>> f0a5bca015a68d44ece7869f65e5357915c03e37

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mobigenz-fe-online';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f0a5bca015a68d44ece7869f65e5357915c03e37
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
<<<<<<< HEAD
>>>>>>> f0a5bca (fix luồng bán hàng + fix get info customer)
=======
>>>>>>> f0a5bca015a68d44ece7869f65e5357915c03e37
}
