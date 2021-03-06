import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule, 
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxPrintModule } from 'ngx-print';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from "ngx-currency";

/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { CertificadoCrhbComponent } from './certificado-crhb/certificado-crhb.component';

defineLocale('de', deLocale);
/* ************+ Import module ngx-bootstrap-datepicker ************ */
const ENTRY_COMPONENTS = [
  BsDatepickerModule,
];

@NgModule({
  declarations: [
    CertificadoCrhbComponent,
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    CommonModule,
    NgSelectModule,
    NgxQRCodeModule,
    NgxPrintModule,
    GoogleChartsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    NgxDocViewerModule,
    TooltipModule.forRoot(),
    // NgxEchartsModule,
    // NgxChartsModule,
    // ChartsModule,
  ],
})
export class RehabilitationConceptModule { }
