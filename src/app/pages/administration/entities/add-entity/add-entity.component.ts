import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../shared/api/services/user.service';
import { ProfilesService } from '../../../../shared/api/services/profiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../../shared/api/services/entity.service';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { parse } from 'querystring';

declare var $: any;

@Component({
  selector: 'ngx-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent implements OnInit {

  data_new_entity: any = {};
  collection_document_types: any [];
  collection_character: any = [];
  collection_relation_types: any = [];
  collection_entity_relation: any = [];
  collection_type_society: any = [];
  collection_regime: any = [];
  token: any = null;
  required: boolean = true;
  submitted: boolean = false;
  document_type: any = 9;
  @Output() flagCreateEntity = new EventEmitter<object>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public profilesService: ProfilesService,
    public entityService: EntityService,
    public utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.fnGetListIdentificationTypes(self.token);
        self.fnGetListaRegimen(self.token);
        self.fnGetListaNaturaleza(self.token);
        self.fnGetListaTipoRelacion(self.token);
        self.fnGetEntitiesList(self.token);
        self.fnGetSocietyTypeList(self.token);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetListIdentificationTypes(current_payload) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataTypeEnum(current_payload, 'identificacion').subscribe(response => {
      if (response.status == 200) {
        this.collection_document_types = response['body'];
      } else {
        this.collection_document_types = response['body'];
      }
    }, err => {
    });
  }


  fnGetListaRegimen(current_payload) {
    this.entityService.fnHttpGetEntidadesRegimen(current_payload).subscribe(resp_get_regime => {
      if (resp_get_regime.status == 200) {
        this.collection_regime = resp_get_regime['body'];
      } else {
        this.collection_regime = resp_get_regime['body'];
      }
    }, err => {
    });
  }

  fnGetListaNaturaleza(current_payload) {
    this.entityService.fnHttpGetEntidadesNaturaleza(current_payload).subscribe(resp_get_character => {
      if (resp_get_character.status == 200) {
        this.collection_character = resp_get_character['body'];
      } else {
        this.collection_character = resp_get_character['body'];
      }
    }, err => {
    });
  }

  fnGetListaTipoRelacion(current_payload) {
    this.entityService.fnHttpGetEntidadesTipoRelacion(current_payload).subscribe(resp_get_relation_type => {
      if (resp_get_relation_type.status == 200) {
        this.collection_relation_types = resp_get_relation_type['body'];
      } else {
        this.collection_relation_types = resp_get_relation_type['body'];
      }
    }, err => {
    });
  }
  
  fnGetEntitiesList(current_payload) {
    const self = this;
    self.entityService.fnHttpGetListEntities(current_payload, '', 1, 1000).subscribe(resp_get_entities => {
      if (resp_get_entities.status == 200) {
        this.collection_entity_relation = resp_get_entities['body']['entidadesOutputModel'];
      } else {
        this.collection_entity_relation = resp_get_entities['body']['entidadesOutputModel'];
      }
    }, err => {

    });
  }
  
  fnGetSocietyTypeList(current_payload) {
    const self = this;
    self.entityService.fnHttpGetEntitiesSocietyType(current_payload).subscribe(resp_get_society_type => {
      if (resp_get_society_type.status == 200) {
        this.collection_type_society = resp_get_society_type['body'];
      } else {
        this.collection_type_society = resp_get_society_type['body'];
      }
    }, err => {

    });
  }

  fnShowGoBackList() {
    const object_data_entity = {
      'tab_id': 1,
      'data_entity': {id: 0, nombre: ''},
    }
    this.flagCreateEntity.emit(object_data_entity);
  }

  fnSendFormAddEntity(data_new_entity) {
    let object_send = {};
    if(data_new_entity.tipoId != 10 && data_new_entity.tipoId != 11){
      object_send = {
        'correoPrincipal': data_new_entity.correoPrincipal, 
        'tipoId': data_new_entity.tipoId,
        'numeroId': data_new_entity.numeroId,
        'primerNombre': data_new_entity.primerNombre,
        'segundoNombre': data_new_entity.segundoNombre,
        'primerApellido': data_new_entity.primerApellido,
        'segundoApellido': data_new_entity.segundoApellido,
        'regimen': data_new_entity.regimen,
        'naturaleza': data_new_entity.naturaleza,
        'diasContrasena': parseInt(data_new_entity.diasContrasena),
      }
    }
    if(data_new_entity.tipoId == 10 || data_new_entity.tipoId == 11){
      object_send = {
        'correoPrincipal': data_new_entity.correoPrincipal, 
        'tipoId': data_new_entity.tipoId,
        'numeroId': data_new_entity.numeroId,
        'razonSocial': data_new_entity.razonSocial,
        'digitoVerificacion': parseInt(data_new_entity.digitoVerificacion),
        'tipoSociedad': parseInt(data_new_entity.tipoSociedad),
        'nombreCompania': data_new_entity.nombreCompania,
        'regimen': data_new_entity.regimen,
        'naturaleza': data_new_entity.naturaleza,
        'diasContrasena': parseInt(data_new_entity.diasContrasena),
        'codigoExterno': data_new_entity.codigoExterno,
        'tipoRelacion': data_new_entity.tipoRelacion,
        'codigoHabilitacion': data_new_entity.codigoHabilitacion,
        'codigoCIIU': parseInt(data_new_entity.codigoCIIU),
        'entidadRelacionId': data_new_entity.entidadRelacionId,
        'sucursal': data_new_entity.sucursal,
      }
    }
    this.entityService.fnHttpSetNewEntity(this.token, object_send).subscribe(resp_post_entities => {
      if (resp_post_entities.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha agregado la entidad con exito!');
        this.fnShowGoBackList();
      }
    }, err => {
      if (err.status == 409) {
        this.utilitiesService.showToast('top-right', 'warning', err.error);
      }
    });
  }

}
