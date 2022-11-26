import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContentComponent } from './content/content.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePassComponent } from './login/forgot/changePass/changePass.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: ContentComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LoginComponent,
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'changePass',
    component: ChangePassComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
