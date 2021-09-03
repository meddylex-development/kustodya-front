import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NgxRegisterComponent } from './sign-up/sign-up.component'; // <---
import { NgxRequestPasswordComponent } from './request-password/request-password.component'; // <---
import { LogoutComponent } from './sign-out/sign-out.component';

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
        path: 'sign-out',
        component: LogoutComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
