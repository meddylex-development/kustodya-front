import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ngx-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {

  public collectionDocumentTypes:any = [
    { 'id': 1, 'nombre': 'Cedula de ciudadania' },
    { 'id': 2, 'nombre': 'Cedula de extrangeria' },
    { 'id': 3, 'nombre': 'NIT' },
    { 'id': 4, 'nombre': 'Pasaporte' },
    { 'id': 5, 'nombre': 'Tarjeta de idenditas' },
  ];

  public documentTypePatient: any = null;

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // $('.btn-show-search-form').click(); // Emulate click display right sidebar to hide
    });
    /* **** END - JQuery definition **** */
  }

  fnShowContent(nameClass) {
    $('.' + nameClass).slideToggle();
  }

}
