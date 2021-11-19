import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { NbAuthModule } from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbTooltipModule,
} from '@nebular/theme';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CertificadoIncapacidadExternoComponent } from './certificado-incapacidad-externo.component';

@NgModule({
  declarations: [
    CertificadoIncapacidadExternoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbTooltipModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    NbAuthModule,
  ]
})
export class CertificadoIncapacidadExternoModule { }
