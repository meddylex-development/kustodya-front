import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';  // <---
import { NgxLoginComponent } from '../_auth/login/login.component'; // <---
import { NgxRegisterComponent } from '../_auth/sign-up/sign-up.component'; // <---
import { NgxRequestPasswordComponent } from '../_auth/request-password/request-password.component'; // <---
import { ActivateAccountComponent } from '../_auth/activate-account/activate-account.component'; // <---
import { UpdatePasswordComponent } from '../_auth/update-password/update-password.component'; // <---
import { LogoutComponent } from '../_auth/sign-out/sign-out.component'; // <---
import { ValidarIncapacidadComponent } from '../_auth/validar-incapacidad/validar-incapacidad.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, // <---
      },{
        path: 'login/:cun',
        component: NgxLoginComponent, // <---
      }, {
        path: 'sign-up',
        component: NgxRegisterComponent, // <---
      }, {
        path: 'request-password',
        component: NgxRequestPasswordComponent, // <---
      }, {
        path: 'activate-account',
        component: ActivateAccountComponent, // <---
      }, {
        path: 'update-password',
        component: UpdatePasswordComponent, // <---
      }, {
        path: 'validar-incapacidad/:guidcode/:fechaInicio/:fechaFin/:diasIncapacidad',
        component: ValidarIncapacidadComponent, // <---
      }, {
        path: 'log-out',
        component: LogoutComponent, // <---
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
