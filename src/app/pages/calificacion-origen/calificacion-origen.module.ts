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

import { ListEmailComponent } from './list-email/list-email.component';
import { BusquedaAvanzadaComponent } from './busqueda-avanzada/busqueda-avanzada.component';
import { TranscriptionComponent } from './transcription/transcription.component';

@NgModule({
  declarations: [
    ListEmailComponent,
    BusquedaAvanzadaComponent,
    TranscriptionComponent,
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
  ],
  entryComponents: [
    BusquedaAvanzadaComponent,
  ],
})
export class CalificacionOrigenModule { }
