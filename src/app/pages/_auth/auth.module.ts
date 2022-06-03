import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbTooltipModule,
} from '@nebular/theme';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


// import { NgxLoginComponent } from './login/login.component'; // <---
// import { NgxRegisterComponent } from './sign-up/sign-up.component'; // <---


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbTooltipModule,
    TooltipModule.forRoot(),

    NbAuthModule,
  ],
  declarations: [
    // ... here goes our new components
    // NgxLoginComponent, // <---
  ],
})
export class NgxAuthModule {
}
