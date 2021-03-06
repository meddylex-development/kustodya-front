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

// import { Cie10Pipe } from '../../shared/pipes/cie10.pipe';

import { ConceptoRehabilitacionComponent } from './concepto-rehabilitacion.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';
import { PrintPreviewComponent } from './print-preview/print-preview.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { ReAssignCaseComponent } from './re-assign-case/re-assign-case.component';
import { PatientInformationComponent } from './patient-information/patient-information.component';
import { SpecialistInformationComponent } from './specialist-information/specialist-information.component';
import { EmisionConfirmComponent } from './emision-confirm/emision-confirm.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { CancelCaseComponent } from './cancel-case/cancel-case.component';
import { NoApplyCaseComponent } from './no-apply-case/no-apply-case.component';
import { ToolsModule } from '../../shared/modules/tools.module';

const ENTRY_COMPONENTS = [
  BsDatepickerModule,
];

@NgModule({
  declarations: [
    // Cie10Pipe,
    ConceptoRehabilitacionComponent, 
    ListComponent, 
    EditComponent, 
    AddComponent, 
    DeleteComponent, 
    DeleteAllComponent, 
    PrintPreviewComponent, 
    AssignCaseComponent, 
    ReAssignCaseComponent, 
    PatientInformationComponent, 
    SpecialistInformationComponent, 
    EmisionConfirmComponent, 
    SendMailComponent, 
    CancelCaseComponent,
    NoApplyCaseComponent,
  ],
  imports: [
    ToolsModule,
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
    PatientInformationComponent,
    SpecialistInformationComponent,
    CancelCaseComponent,
    NoApplyCaseComponent,
  ],
})
export class ConceptoRehabilitacionModule { }
