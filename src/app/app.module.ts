import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD

@NgModule({
  declarations: [
    AppComponent
=======
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './content/products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonPrimengModuleModule } from './common-primeng-module.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrdersComponent } from './orders/orders.component';
import { ToastrModule } from 'ngx-toastr';
import { ForgotComponent } from './login/forgot/forgot.component';
import { ForgotModule } from './login/forgot/forgot.module';
import { ChangePassComponent } from './login/forgot/changePass/changePass.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { AddressComponent } from './checkout/address/address.component';
import { InfoService } from 'src/service/infoCustomer.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ForgotComponent,
    OrdersComponent,
    LoginComponent,
    ChangePassComponent,
    ProfileComponent,
    AddressComponent,
>>>>>>> f0a5bca (fix luồng bán hàng + fix get info customer)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
