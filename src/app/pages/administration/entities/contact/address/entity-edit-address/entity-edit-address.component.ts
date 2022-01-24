import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../../../shared/api/services/user.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-edit-address',
  templateUrl: './entity-edit-address.component.html',
  styleUrls: ['./entity-edit-address.component.scss'],
})
export class EntityEditAddressComponent implements OnInit {

  @Input() data_entity: any;
  submitted: boolean = false;
  current_payload: any = null;
  user_id: any = null;
  entity_data: any = {};
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
    public router: Router,
    private entityService: EntityService,
    private userService: UserService,
    protected ref: NbDialogRef<EntityEditAddressComponent>,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem("token");
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
      self.index = self.data_entity['index'];

      self.entity_data['address_type'] = self.data_entity['tipoViaPrincipal'];
      self.entity_data['address_first_number'] = self.data_entity['numeroViaPrincipal'];
      self.entity_data['address_first_letter'] = self.data_entity['letraViaPrincipal'];
      self.entity_data['address_second_number'] = self.data_entity['numeroViaSecundaria'];
      self.entity_data['address_second_letter'] = self.data_entity['letraViaSecundaria'];
      self.entity_data['address_third_number'] = self.data_entity['distanciaInterseccion'];
      self.entity_data['address_indications'] = self.data_entity['indicaciones'];
      self.entity_data['address_city'] = self.data_entity['indicaciones'];

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

  fnCancelEditAddressEntity() {
    this.submitted = false;
    this.dismiss();
  }

  fnEditAddressEntity(entity_data) {
    const self = this;
    self.submitted = true;
    const first_letter = (entity_data['address_first_letter']['descripcion']) ? entity_data['address_first_letter']['descripcion'] : entity_data['address_first_letter'];
    const second_letter = (entity_data['address_second_letter']['descripcion']) ? entity_data['address_second_letter']['descripcion'] : entity_data['address_second_letter'];
    const full_address =
      parseInt(entity_data['address_type'], 10) + ' ' +
      entity_data['address_first_number'] + ' ' +
      first_letter + ' # ' +
      entity_data['address_second_number'] + ' ' +
      second_letter + ' ' +
      entity_data['address_third_number'];
    // return false;
    const data_collection = [
      {
        'op' : 'replace',
        'path' : 'Direcciones/' + self.index,
        'value': {
          'EntidadId': parseInt(self.data_entity['entity_id'], 10),
          'DivipolaId': parseInt(entity_data['address_city'], 10),
          'TipoViaPrincipal': parseInt(entity_data['address_type'], 10),
          'NumeroViaPrincipal': parseInt(entity_data['address_first_number'], 10),
          'LetraViaPrincipal': first_letter,
          'NumeroViaSecundaria': parseInt(entity_data['address_second_number'], 10),
          'LetraViaSecundaria': second_letter,
          'DistanciaInterseccion': parseInt(entity_data['address_third_number'], 10),
          'Indicaciones': entity_data['address_indications'],
        },
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.data_entity['entity_id'], data_collection).subscribe(r => {
      if (r.status == 204) {
        self.entity_data = {};
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
