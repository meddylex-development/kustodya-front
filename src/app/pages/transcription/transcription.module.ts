import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranscriptionPrintComponent } from './transcription-print/transcription-print.component';
// import { TranscriptionCkeckComponent } from './transcription-ckeck/transcription-ckeck.component';
// import { TranscriptionIssuanceComponent } from './transcription-issuance/transcription-issuance.component';
// import { TranscriptionUserComponent } from './transcription-user/transcription-user.component';
// import { TranscriptionHistoryComponent } from './transcription-history/transcription-history.component';
// import { TranscriptionDiagnosticComponent } from './transcription-diagnostic/transcription-diagnostic.component';
/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale('de', deLocale);
/* ************+ Import module ngx-bootstrap-datepicker ************ */
const ENTRY_COMPONENTS = [
  BsDatepickerModule,
];
@NgModule({
  declarations: [
    // TranscriptionIssuanceComponent,
    // TranscriptionUserComponent,
    // TranscriptionHistoryComponent,
    // TranscriptionDiagnosticComponent,
    // TranscriptionCkeckComponent
    // TranscriptionPrintComponent
  ],
  imports: [
    CommonModule,
    // BsDatepickerModule.forRoot(),
  ],
  // entryComponents: [
  //   ...ENTRY_COMPONENTS,
  // ],
  // exports: [BsDatepickerModule],
})
export class TranscriptionModule { }
