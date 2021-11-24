import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ModalOverlaysModule } from './modal-overlays/modal-overlays.module';
import { NbTooltipModule, NbCheckboxModule } from '@nebular/theme';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GoogleChartsModule } from 'angular-google-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
/* ************+ Import module ngx-bootstrap-datepicker ************ */

// Custom pages modules
import { BaseModule } from './base/base.module';
import { DashboardModule } from './dashboard/dashboard.module';
// import { MyAccountModule } from './user/my-account/my-account.module';
import { IncapacityModule } from './incapacity/incapacity.module';
import { EmailManagementModule } from './email-management/email-management.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    // NgbTimepicker,
    PagesRoutingModule,
    MiscellaneousModule,
    ThemeModule,
    NbTooltipModule,
    NbCheckboxModule,
    TooltipModule.forRoot(),
    GoogleChartsModule.forRoot(),
    // Custome pages modules
    BaseModule,
    DashboardModule,
    IncapacityModule,
    // MyAccountModule,
    ModalOverlaysModule,
    EmailManagementModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
