import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-balance-cases',
  templateUrl: './balance-cases.component.html',
  styleUrls: ['./balance-cases.component.scss']
})
export class BalanceCasesComponent implements OnInit {

  public submitted: boolean = false;
  public statusBtnAssign: boolean = true;
  public statusBtnDisable: boolean = true;
  public statusBtnEnable: boolean = true;
  public chkSwitchAllEnableSpecialist: boolean = false;
  public chkSwitchAllDisabledSpecialist: boolean = false;
  public textLoading: string = '';
  public collectionSpecilistEnable: any = [
    { "id": 1, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 2, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 3, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 4, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 5, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 6, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 7, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 8, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 9, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 10, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 11, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 12, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 13, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 14, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 15, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 16, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 17, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 18, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 19, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 20, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 21, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
  ];
  public collectionSpecilistDisabled: any = [
    { "id": 1, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 2, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 3, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 4, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 5, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": false, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 6, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
    { "id": 7, "numeroDocumeto": "2362435545", "nombres": "Ricardo Humberto", "apellidos": "Rodriguez Diaz", "email": "rrodiguez@gmail.com", "telefono": "3105273954", "checked": false, "esMedico": true, "metricasCasos": { "asignados": 240, "enProceso": 10, "emitidos": 223 } },
  ];
  public checkBlockCases: boolean = false;
  public pagination: any = {
    "espDisponibles": {
      "itemsPerPage": 5,
      "currentPage": 1,
      "totalItems": 21,
    }, 
    "espNoDisponibles": {
      "itemsPerPage": 5,
      "currentPage": 1,
      "totalItems": 7,
    }
  };

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
  }


  fnReturnPage(): void {
    this.location.back();
  }

  fnSelectState(dataState) {
    console.log('dataState: ', dataState);
  }

  switchAllEnableSpecialist(value) {
    console.log('value: ', value);
    let collectionSpecilistEnable = JSON.parse(JSON.stringify(this.collectionSpecilistEnable));
    if (value) {
      this.statusBtnDisable = false;
      this.statusBtnAssign = false;
      collectionSpecilistEnable.forEach(element => {
        console.log('element: ', element);
        element.checked = true;
      });
    } else {
      this.statusBtnDisable = true;
      this.statusBtnAssign = true;
      collectionSpecilistEnable.forEach(element => {
        console.log('element: ', element);
        element.checked = false;
      });
    }
    console.log('collectionSpecilistEnable: ', collectionSpecilistEnable);
    this.collectionSpecilistEnable = collectionSpecilistEnable;
  }

  switchAllDisabledSpecialist(value) {
    console.log('value: ', value);
    let collectionSpecilistDisabled = JSON.parse(JSON.stringify(this.collectionSpecilistDisabled));
    if (value) {
      this.statusBtnEnable = false;
      collectionSpecilistDisabled.forEach(element => {
        console.log('element: ', element);
        element.checked = true;
      });
    } else {
      this.statusBtnEnable = true;
      collectionSpecilistDisabled.forEach(element => {
        console.log('element: ', element);
        element.checked = false;
      });
    }
    console.log('collectionSpecilistDisabled: ', collectionSpecilistDisabled);
    this.collectionSpecilistDisabled = collectionSpecilistDisabled;
  }

  getPage($event, tabId) {
    console.log('tabId: ', tabId);
    console.log('$event: ', $event);
    switch (tabId) {
      case 1:
        this.pagination['espDisponibles']['currentPage'] = $event;
        break;
      case 2:
        this.pagination['espNoDisponibles']['currentPage'] = $event;
        break;
    }
  }

}
