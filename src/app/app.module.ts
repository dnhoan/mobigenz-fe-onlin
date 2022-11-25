import { LOCALE_ID, NgModule } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpRequest,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthInterceptor } from './interceptor/auth-interceptor.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonPrimengModuleModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    DialogModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
