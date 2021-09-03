import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../../../shared/api/services/user.service';
declare var $: any;

@Component({
  selector: 'ngx-user-add-address',
  templateUrl: './user-add-address.component.html',
  styleUrls: ['./user-add-address.component.scss'],
})
export class UserAddAddressComponent implements OnInit {

  @Input() data_user: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  token: any = null;
  data_list_cities_original: any = null;
  data_list_cities: any = null;
  data_list_routes_original: any = null;
  data_list_routes: any = null;
  data_user_full: any = null;

  collection_address_types: any = [
    { 'id': 1, 'descripcion': 'Avenida'},
    { 'id': 2, 'descripcion': 'Carrera'},
    { 'id': 3, 'descripcion': 'Calle'},
    { 'id': 4, 'descripcion': 'Transversal'},
    { 'id': 5, 'descripcion': 'Diagonal'},
  ];

  collection_address_letters_location: any = [
    { 'id': 1, 'descripcion': 'A'},
    { 'id': 2, 'descripcion': 'B'},
    { 'id': 3, 'descripcion': 'C'},
    { 'id': 4, 'descripcion': 'D'},
    { 'id': 5, 'descripcion': 'E'},
    { 'id': 6, 'descripcion': 'F'},
    { 'id': 7, 'descripcion': 'G'},
    { 'id': 8, 'descripcion': 'H'},
    { 'id': 9, 'descripcion': 'I'},
    { 'id': 10, 'descripcion': 'J'},
    { 'id': 11, 'descripcion': 'K'},
    { 'id': 12, 'descripcion': 'L'},
    { 'id': 13, 'descripcion': 'M'},
    { 'id': 14, 'descripcion': 'N'},
    { 'id': 15, 'descripcion': 'O'},
    { 'id': 16, 'descripcion': 'P'},
    { 'id': 17, 'descripcion': 'Q'},
    { 'id': 18, 'descripcion': 'R'},
    { 'id': 19, 'descripcion': 'S'},
    { 'id': 20, 'descripcion': 'T'},
    { 'id': 21, 'descripcion': 'U'},
    { 'id': 22, 'descripcion': 'W'},
    { 'id': 23, 'descripcion': 'X'},
    { 'id': 24, 'descripcion': 'Y'},
    { 'id': 25, 'descripcion': 'Z'},
  ];

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    protected ref: NbDialogRef<UserAddAddressComponent>,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('payload');
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
      self.fnGetDataListCities(self.token);
      self.fnGetDataListTypeRoute(self.token);
    } else {
      self.router.navigateByUrl('');
    }
  }

  fnGetDataListCities(token) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataListCities(token).subscribe(response => {
      if (response.status == 200) {
        this.data_list_cities = JSON.parse(JSON.stringify(response['body']));
        this.data_list_cities_original = JSON.parse(JSON.stringify(response['body']));
      } else {
        this.data_list_cities = [];
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetDataListTypeRoute(token) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataListTypeRoute(token).subscribe(response => {
      if (response.status == 200) {
        this.data_list_routes = JSON.parse(JSON.stringify(response['body']));
        this.data_list_routes_original = JSON.parse(JSON.stringify(response['body']));
      } else {
        this.data_list_routes = [];
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelCreateNewAddressUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnCreateNewAddressUser(user_data) {
    const self = this;
    const full_address =
      user_data['address_type']['value'] + ' ' +
      user_data['address_first_number'] + ' ' +
      user_data['address_first_letter']['descripcion'] + ' # ' +
      user_data['address_second_number'] + ' ' +
      user_data['address_second_letter']['descripcion'] + ' ' +
      user_data['address_third_number'];
    self.submitted = true;
    const data_user = [
      {
        'op' : 'add',
        'path' : 'Direcciones/-',
        'value': {
          'UsuarioId': parseInt(self.user_id, 10),
          'DivipolaId': parseInt(user_data['address_city'], 10),
          'TipoViaPrincipal': parseInt(user_data['address_type'], 10),
          'NumeroViaPrincipal': parseInt(user_data['address_first_number'], 10),
          'LetraViaPrincipal': user_data['address_first_letter']['descripcion'],
          'NumeroViaSecundaria': parseInt(user_data['address_second_number'], 10),
          'LetraViaSecundaria': user_data['address_second_letter']['descripcion'],
          'DistanciaInterseccion': parseInt(user_data['address_third_number'], 10),
          'Indicaciones': user_data['address_indications'],
        },
      },
    ];
    self.userService.fnHttpSetPatchDataUser(self.token, self.user_id, data_user).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
