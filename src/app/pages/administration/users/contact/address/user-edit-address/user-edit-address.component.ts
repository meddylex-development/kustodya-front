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
  selector: 'ngx-user-edit-address',
  templateUrl: './user-edit-address.component.html',
  styleUrls: ['./user-edit-address.component.scss'],
})
export class UserEditAddressComponent implements OnInit {

  @Input() data_user: any;
  submitted: boolean = false;
  current_payload: any = null;
  user_id: any = null;
  user_data: any = {};
  index: any = null;
  token: any = null;
  data_list_cities_original: any = null;
  data_list_cities: any = null;
  data_list_routes_original: any = null;
  data_list_routes: any = null;

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
    protected ref: NbDialogRef<UserEditAddressComponent>,
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
      self.index = self.data_user['index'];

      self.user_data['address_type'] = self.data_user['tipoViaPrincipal'];
      self.user_data['address_first_number'] = self.data_user['numeroViaPrincipal'];
      self.user_data['address_first_letter'] = self.data_user['letraViaPrincipal'];
      self.user_data['address_second_number'] = self.data_user['numeroViaSecundaria'];
      self.user_data['address_second_letter'] = self.data_user['letraViaSecundaria'];
      self.user_data['address_third_number'] = self.data_user['distanciaInterseccion'];
      self.user_data['address_indications'] = self.data_user['indicaciones'];
      self.user_data['address_city'] = self.data_user['indicaciones'];

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

  fnCancelEditAddressUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnEditAddressUser(user_data) {
    const self = this;
    self.submitted = true;
    const first_letter = (user_data['address_first_letter']['descripcion']) ? user_data['address_first_letter']['descripcion'] : user_data['address_first_letter'];
    const second_letter = (user_data['address_second_letter']['descripcion']) ? user_data['address_second_letter']['descripcion'] : user_data['address_second_letter'];
    const full_address =
      parseInt(user_data['address_type'], 10) + ' ' +
      user_data['address_first_number'] + ' ' +
      first_letter + ' # ' +
      user_data['address_second_number'] + ' ' +
      second_letter + ' ' +
      user_data['address_third_number'];
    // return false;
    const data_user = [
      {
        'op' : 'replace',
        'path' : 'Direcciones/' + self.index,
        'value': {
          'UsuarioId': parseInt(self.user_id, 10),
          'DivipolaId': parseInt(user_data['address_city'], 10),
          'TipoViaPrincipal': parseInt(user_data['address_type'], 10),
          'NumeroViaPrincipal': parseInt(user_data['address_first_number'], 10),
          'LetraViaPrincipal': first_letter,
          'NumeroViaSecundaria': parseInt(user_data['address_second_number'], 10),
          'LetraViaSecundaria': second_letter,
          'DistanciaInterseccion': parseInt(user_data['address_third_number'], 10),
          'Indicaciones': user_data['address_indications'],
        },
      },
    ];
    self.userService.fnHttpSetPatchDataUser(self.token, self.user_id, data_user).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico actualizado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico actualizado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
