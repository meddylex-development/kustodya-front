import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from "ngx-currency";
import { GoogleChartsModule } from 'angular-google-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DictamenPericialComponent } from './dictamen-pericial.component';
import { ListadoCasosComponent } from './listado-casos/listado-casos.component';
import { AuditarCasoComponent } from './auditar-caso/auditar-caso.component';
import { CrearComponent } from './crear/crear.component';

@NgModule({
  declarations: [
    DictamenPericialComponent, 
    ListadoCasosComponent, 
    AuditarCasoComponent, 
    CrearComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    GoogleChartsModule.forRoot(),
    NgxPaginationModule,
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
    CommonModule
  ]
})
export class DictamenPericialModule { }
