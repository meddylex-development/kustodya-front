import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class RehabilitationConceptModule { }
