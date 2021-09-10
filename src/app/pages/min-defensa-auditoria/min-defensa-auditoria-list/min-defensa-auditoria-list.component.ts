import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EntityService } from '../../../shared/api/services/entity.service';
import { PatientService } from '../../../shared/api/services/patient.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service'
import { EnumerationsService } from '../../../shared/api/services/enumerations.service'
import { NbDialogService } from '@nebular/theme';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';
defineLocale('es', esLocale);
declare var $: any;

// import { RehabilitationConceptDetailPreviewComponent } from '../rehabilitation-concept-detail-preview/rehabilitation-concept-detail-preview.component';

@Component({
  selector: 'ngx-min-defensa-auditoria-list',
  templateUrl: './min-defensa-auditoria-list.component.html',
  styleUrls: ['./min-defensa-auditoria-list.component.scss']
})
export class MinDefensaAuditoriaListComponent implements OnInit {

  // list_patients: any = [];
  // list_patients_original: any = [];
  list_patients: any = {
    "correoOutputModel": [
      {
        "id": 85700,
        "messageId": "85700",
        "sencon": "2019-85700",
        "fechaCuentaCobro": 1476874800000,
        "actor": "Andres Alberto Acevedo Pulido y otros",
        "tipo": "Sentencia",
        "estado": "Por Gestionar",
        "pretension": "Lesiones personales",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 89502,
        "messageId": "89502",
        "sencon": "2018-89502",
        "fechaCuentaCobro": 1515771000000,
        "actor": "Julian Fernando Villabon Bermudez",
        "tipo": "Conciliacion Extrajudicial",
        "estado": "Por Gestionar",
        "pretension": "Pension de invalidez",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 63823,
        "messageId": "63823",
        "sencon": "2018-63823",
        "fechaCuentaCobro": 1516043450000,
        "actor": "Jose Mauricio Ramos Uribe",
        "tipo": "Conciliacion Extrajudicial",
        "estado": "Por Gestionar",
        "pretension": "Conciliacion Judicial",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 79017,
        "messageId": "79017",
        "sencon": "2018-79017",
        "fechaCuentaCobro": 1516099616000,
        "actor": "Erney Gaviria Flórez",
        "tipo": "Conciliacion Extrajudicial",
        "estado": "Por Gestionar",
        "pretension": "Reliquidación pensión invalidez",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 69613,
        "messageId": "69613",
        "sencon": "2018-69613",
        "fechaCuentaCobro": 1516626991000,
        "actor": "Ivan Andres Redondo Julio",
        "tipo": "Conciliacion Extrajudicial",
        "estado": "Por Gestionar",
        "pretension": "Lesiones personales",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 87923,
        "messageId": "87923",
        "sencon": "2018-87923",
        "fechaCuentaCobro": 1516880663000,
        "actor": "Hernan Alonso Gonzalez Mallarino",
        "tipo": "Conciliacion Judicial",
        "estado": "Por Gestionar",
        "pretension": "Lesiones personales",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 74756,
        "messageId": "74756",
        "sencon": "2018-74756",
        "fechaCuentaCobro": 1516987383000,
        "actor": "Dario Jimenez Viveros",
        "tipo": "Conciliacion Judicial",
        "estado": "Por Gestionar",
        "pretension": "Lesiones personales",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 29403,
        "messageId": "29403",
        "sencon": "2018-29403",
        "fechaCuentaCobro": 1518592501000,
        "actor": "Jose Jesus Vinasco Vera",
        "tipo": "Sentencia",
        "estado": "Por Gestionar",
        "pretension": "Asignacion basica",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 11623,
        "messageId": "11623",
        "sencon": "2018-11623",
        "fechaCuentaCobro": 1519637470000,
        "actor": "Marleny Quintero de Cortes",
        "tipo": "Sentencia",
        "estado": "Por Gestionar",
        "pretension": "Pension sobrevivientes",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 65468,
        "messageId": "65468",
        "sencon": "2018-65468",
        "fechaCuentaCobro": 1520340342000,
        "actor": "Angela Maria Herminda Fernandez",
        "tipo": "Sentencia",
        "estado": "Por Gestionar",
        "pretension": "Prima de actividad y subsidio familiar",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 26620,
        "messageId": "26620",
        "sencon": "2018-26620",
        "fechaCuentaCobro": 1521133906000,
        "actor": "Edison Angarita Celis",
        "tipo": "Sentencia",
        "estado": "Por Gestionar",
        "pretension": "pension de invalidez",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },
      {
        "id": 76660,
        "messageId": "76660",
        "sencon": "2018-76660",
        "fechaCuentaCobro": 1521148760000,
        "actor": "Olga Janeth Daza Bernal y otros",
        "tipo": "Conciliacion Judicial",
        "estado": "Por Gestionar",
        "pretension": "Lesiones personales",
        "medioControl": "Reparación directa",
        "adjuntos": [
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
          {
            "nombreArchivo": "Lab - steer rosado roberto juan c.c. 3347673.pdf",
            "archivoId": "a1204248-b7d0-4642-9c21-0f6f7fb5a39f_Lab - steer rosado roberto juan c.c. 3347673.pdf"
          },
        ]
      },

    ],
    "paginacion": {
      "totalItems": 12,
      "itemsPorPagina": 12,
      "paginaActual": 1,
      "totalPaginas": 1,
      "anterior": 1,
      "siguiente": 2
    }
  };
  list_patients_original: any = [];
  totalItems: any = 1;
  currentPage: any = 1;
  numItemsPage: any = 10;
  prevPage: any = null;
  nextNext: any = null;
  totalPaginas: any = null;
  search_input: any = '';
  public current_payload: string = null;
  @Output() flagCreateEntity = new EventEmitter<object>();
  @Input() data_object: any;

  loading_state: boolean = false;
  collection_data: any = [
    // {'id': 1, 'name': 'Por emitir'},
    // {'id': 2, 'name': 'Emitido'},
    // {'id': 3, 'name': 'Anulado'},
  ];
  status_list: any = null;

  colorTheme = 'theme-green';
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate = new Date();
  locale = 'es';
  isSuperAdmin: any = false;
  date_range = [];
  start_date: any = '';
  end_date: any = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private patientService: PatientService,
    private originQualificationService: OriginQualificationService,
    private enumerationsService: EnumerationsService,
    private entityService: EntityService,
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
    private bsLocaleService: BsLocaleService,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    self.bsLocaleService.use('es');
    // self.data_object
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.status_list = 1;
        self.fnGetOriginQualificationListStates(self.current_payload);
        if (self.data_object) {
          self.date_range = self.data_object['date_range'];
          self.search_input = self.data_object['search_input'];
          self.fnGetOriginQualificationList(self.current_payload, self.data_object['currentPage'], self.data_object['search_input'], self.data_object['status_list'], self.data_object['start_date'], self.data_object['end_date']);
        } else {
          self.fnGetOriginQualificationList(self.current_payload, self.currentPage, self.search_input, self.status_list, self.start_date, self.end_date);
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetOriginQualificationListStates(current_payload) {
    const self = this;
    self.collection_data = [{"name":"Por Gestionar","value":1},{"name":"Sin Transcribir","value":2},{"name":"Transcrito","value":3}];
    return self.collection_data;
    // self.enumerationsService.fnHttpGetOriginQualificationListStates(current_payload).subscribe(resp_get_patients => {
    //   if (resp_get_patients.status == 200) {
    //     // self.collection_data = JSON.parse(JSON.stringify(resp_get_patients.body));
    //   }
    // }, err => {
    // });
  }

  fnGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date) {
    const self = this;
    // self.loading_state = true;
    self.list_patients = self.list_patients['correoOutputModel'];
    console.log('self.list_patients: ', self.list_patients);
    self.list_patients_original = self.list_patients;
    self.totalItems = 5;
    self.numItemsPage = 5;
    self.currentPage = 1;
    self.prevPage = 1;
    self.nextNext = 2;
    self.totalPaginas = 1;
    self.loading_state = false;
    // self.originQualificationService.fnHttpGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date).subscribe(resp_get_patients => {
    //   if (resp_get_patients.status == 200) {
    //     self.list_patients = JSON.parse(JSON.stringify(resp_get_patients.body['correoOutputModel']));
    //     self.list_patients_original = JSON.parse(JSON.stringify(resp_get_patients.body['correoOutputModel']));
    //     self.totalItems = resp_get_patients.body['paginacion']['totalItems'];
    //     self.numItemsPage = resp_get_patients.body['paginacion']['itemsPorPagina'];
    //     self.currentPage = resp_get_patients.body['paginacion']['paginaActual'];
    //     self.prevPage = resp_get_patients.body['paginacion']['anterior'];
    //     self.nextNext = resp_get_patients.body['paginacion']['siguiente'];
    //     self.totalPaginas = resp_get_patients.body['paginacion']['totalPaginas'];
    //     self.loading_state = false;
    //   }
    // }, err => {
    //   self.loading_state = false;
    // });
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3 || text_search.length < 1) {

      const date_start_unix = moment(self.date_range[0]).unix();
      const date_start_valueof = (self.date_range.length > 0) ? moment(self.date_range[0]).valueOf() : '';
      const date_end_unix = moment(self.date_range[1]).unix();
      const date_end_valueof = (self.date_range.length > 0) ? moment(self.date_range[1]).valueOf() : '';

      self.fnGetOriginQualificationList(self.current_payload, self.currentPage, text_search, self.status_list, date_start_valueof, date_end_valueof);
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      // text_search = '';
      // self.search_input = '';
      // self.fnGetOriginQualificationList(self.current_payload, self.currentPage, text_search, self.status_list);
    }
  }

  getPage(page: number) {
    const self = this;
    self.currentPage = page;

    const date_start_unix = moment(self.date_range[0]).unix();
    const date_start_valueof = (self.date_range.length > 0) ? moment(self.date_range[0]).valueOf() : '';
    const date_end_unix = moment(self.date_range[1]).unix();
    const date_end_valueof = (self.date_range.length > 0) ? moment(self.date_range[1]).valueOf() : '';

    self.fnGetOriginQualificationList(self.current_payload, self.currentPage, self.search_input, self.status_list, date_start_valueof, date_end_valueof);
  }

  fnChangeStatusList(state_select) {
    const self = this;
    self.status_list = state_select['value'];
    const date_start_unix = moment(self.date_range[0]).unix();
    const date_start_valueof = (self.date_range.length > 0) ? moment(self.date_range[0]).valueOf() : '';
    const date_end_unix = moment(self.date_range[1]).unix();
    const date_end_valueof = (self.date_range.length > 0) ? moment(self.date_range[1]).valueOf() : '';
    self.fnGetOriginQualificationList(self.current_payload, self.currentPage, self.search_input, state_select['value'], date_start_valueof, date_end_valueof);
  }

  fnShowOptionsView(msg) {
    this.flagCreateEntity.emit(msg);
  }

  fnShowOriginQualificationTranscription(patient, status_list) {
    patient['status_list'] = status_list;
    patient['search_input'] = this.search_input;
    patient['currentPage'] = this.currentPage;
    patient['date_range'] = (this.date_range.length > 0) ? this.date_range : [];
    patient['start_date'] = (this.date_range.length > 0) ? moment(this.date_range[0]).valueOf() : '';
    patient['end_date'] = (this.date_range.length > 0) ? moment(this.date_range[1]).valueOf() : '';
    const object_data = {
      'tab_id': 2,
      'data_object': patient,
    };
    this.fnShowOptionsView(object_data);
  }

  fnCleanSearhInput() {
    const self = this;
    self.status_list = 1;
    self.search_input = '';
    self.currentPage = 1;
    self.start_date = '';
    self.end_date = '';
    self.fnGetOriginQualificationList(self.current_payload, self.currentPage, self.search_input, self.status_list, null, null);
    self.date_range = [];
  }

  fnDateRangeFilterSesrch($event) {
  }

  fnOpenCalendar() {
    $('#inputRangeDate').click();
  }

  fnFilterListByDaterange($event) {
    const self = this;
    // self.date_range;
    // self.search_input

    const date_start_unix = moment(self.date_range[0]).unix();
    const date_start_valueof = (self.date_range.length > 0) ? moment(self.date_range[0]).valueOf() : '';
    const date_end_unix = moment(self.date_range[1]).unix();
    const date_end_valueof = (self.date_range.length > 0) ? moment(self.date_range[1]).valueOf() : '';

    self.start_date = date_start_valueof;
    self.end_date = date_end_valueof;

    self.fnGetOriginQualificationList(self.current_payload, self.currentPage, self.search_input, self.status_list, date_start_valueof, date_end_valueof);
  }

}
