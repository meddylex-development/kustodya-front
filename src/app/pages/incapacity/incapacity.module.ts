import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratedDiagnosticComponent } from './generated-diagnostic/generated-diagnostic.component';
// import { CheckDiagnosticComponent } from './check-diagnostic/check-diagnostic.component';
// import { IncapacityUserComponent } from './incapacity-user/incapacity-user.component';
// import { IncapacityHistoryComponent } from './incapacity-history/incapacity-history.component';
// import { IncapacityDiagnosticComponent } from './incapacity-diagnostic/incapacity-diagnostic.component';
// import { IncapacityIssuanceComponent } from './incapacity-issuance/incapacity-issuance.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { GoogleChartsModule } from 'angular-google-charts';
import { IncapacityRehabilitationConceptComponent } from './emission/incapacity-rehabilitation-concept/incapacity-rehabilitation-concept.component';
import { PreviewRehabilitationConceptComponent } from './emission/preview-rehabilitation-concept/preview-rehabilitation-concept.component';
// import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@NgModule({
  declarations: [
    GeneratedDiagnosticComponent,
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    NgxQRCodeModule,
    GoogleChartsModule.forRoot(),
  ],
  entryComponents: [
    GeneratedDiagnosticComponent,
    IncapacityRehabilitationConceptComponent,
    PreviewRehabilitationConceptComponent,
  ],
})
export class IncapacityModule { }
