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
defineLocale('de', deLocale);
/* ************+ Import module ngx-bootstrap-datepicker ************ */

import { ConceptoRehabilitacionComponent } from './concepto-rehabilitacion.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';
import { PrintPreviewComponent } from './print-preview/print-preview.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { ReAssignCaseComponent } from './re-assign-case/re-assign-case.component';

const ENTRY_COMPONENTS = [
  BsDatepickerModule,
];

@NgModule({
  declarations: [
    ConceptoRehabilitacionComponent, 
    ListComponent, 
    EditComponent, 
    AddComponent, 
    DeleteComponent, 
    DeleteAllComponent, 
    PrintPreviewComponent, 
    AssignCaseComponent, 
    ReAssignCaseComponent, 
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
  entryComponents: [
    ConceptoRehabilitacionComponent, 
    ListComponent, 
    EditComponent, 
    AddComponent, 
    DeleteComponent, 
    DeleteAllComponent, 
    PrintPreviewComponent, 
    AssignCaseComponent, 
    ReAssignCaseComponent, 
  ],
})
export class ConceptoRehabilitacionModule { }
