import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {
    path: 'forgot',
    component: ForgotComponent,
  },
]

export const LoginRoutes = RouterModule.forChild(routes);
