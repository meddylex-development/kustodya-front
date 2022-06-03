import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../shared/api/services/user.service';
import { ProfilesService } from '../../../../shared/api/services/profiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../../shared/api/services/entity.service';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-entity-basic-info',
  templateUrl: './entity-basic-info.component.html',
  styleUrls: ['./entity-basic-info.component.scss']
})
export class EntityBasicInfoComponent implements OnInit {

  @Input() dataEntityTab: any;
  data_new_entity: any = {};
  loading_state: any = false;
  document_type: any = 9;
  token: any = null;
  entity_id: any = null;
  object_data_entity: any = {
    'id': null,
    'tipoId': null,
    'numeroId': null,
    'tipoRelacion': null,
    'entidadRelacionId': null,
    'razonSocial': null,
    'primerNombre': null,
    'segundoNombre': null,
    'primerApellido': null,
    'segundoApellido': null,
    'correoPrincipal': null,
    'digitoVerificacion': null,
    'regimen': null,
    'naturaleza': null,
    'diasContrasena': null,
    'nombreCompania': null,
    'codigoExterno': null,
    'codigoHabilitacion': null,
    'codigoCIIU': null,
    'tipoSociedad': null,
    'gerentePorDefectoId': null,
    'coordinadorPorDefectoId': null,
    'interventorPorDefectoId': null,
    'aprobadorPorDefectoId': null,
    'contabilidadDefecto': null,
    'telefonos': [],
    'direcciones': [],
    'correos': [],
    'redesSociales': [],
    'clientes': [],
    'otros': [],
  };
  required: any = true;
  submitted: any = false;
  collection_character: any = [];
  collection_relation_types: any = [];
  collection_entity_relation: any = [];
  collection_type_society: any = [];
  collection_document_types: any = [];
  collection_regime: any = [];

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
        // self.dataEntityTab
        self.entity_id = self.dataEntityTab['id']
        self.fnGetListIdentificationTypes(self.token);
        self.fnGetListaRegimen(self.token);
        self.fnGetListaNaturaleza(self.token);
        self.fnGetListaTipoRelacion(self.token);
        self.fnGetEntitiesList(self.token);
        self.fnGetDataEntityById(self.entity_id, self.token);
        self.fnGetSocietyTypeList(self.token);
      } else {
        // self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataEntityById(entity_id, current_payload) {
    this.loading_state = true;
    this.entityService.fnHttpGetDataEntityById(current_payload, entity_id).subscribe(response => {
      if (response.status == 200) {
        this.object_data_entity = response['body'];
        this.document_type = response['body']['tipoId'];
        setTimeout(() => {
          this.loading_state = false;
        }, 2000);
      } else {
        this.object_data_entity = response['body'];
        this.document_type = response['body']['tipoId'];
      }
    }, err => {
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

  fnSendFormUpdateEntity(entity_basic_info) {
    const self = this;
    self.submitted = true;

    const objSendService = {
      'tipoId': (entity_basic_info['tipoId']) ? entity_basic_info['tipoId'] : '',
      'numeroId': (entity_basic_info['numeroId']) ? entity_basic_info['numeroId'] : '',
      'tipoRelacion': (entity_basic_info['tipoRelacion']) ? entity_basic_info['tipoRelacion'] : '',
      'entidadRelacionId': (entity_basic_info['entidadRelacionId']) ? entity_basic_info['entidadRelacionId'] : '',
      'razonSocial': (entity_basic_info['razonSocial']) ? entity_basic_info['razonSocial'] : '',
      'primerNombre': (entity_basic_info['primerNombre']) ? entity_basic_info['primerNombre'] : '',
      'segundoNombre': (entity_basic_info['segundoNombre']) ? entity_basic_info['segundoNombre'] : '',
      'primerApellido': (entity_basic_info['primerApellido']) ? entity_basic_info['primerApellido'] : '',
      'segundoApellido': (entity_basic_info['segundoApellido']) ? entity_basic_info['segundoApellido'] : '',
      'correoPrincipal': (entity_basic_info['correoPrincipal']) ? entity_basic_info['correoPrincipal'] : '',
      'sucursal': (entity_basic_info['sucursal']) ? entity_basic_info['sucursal'] : '',
      'digitoVerificacion': (entity_basic_info['digitoVerificacion']) ? entity_basic_info['digitoVerificacion'] : '',
      'regimen': (entity_basic_info['regimen']) ? entity_basic_info['regimen'] : '',
      'naturaleza': (entity_basic_info['naturaleza']) ? entity_basic_info['naturaleza'] : '',
      'diasContrasena': (entity_basic_info['diasContrasena']) ? entity_basic_info['diasContrasena'] : '',
      'nombreCompania': (entity_basic_info['nombreCompania']) ? entity_basic_info['nombreCompania'] : '',
      'codigoExterno': (entity_basic_info['codigoExterno']) ? entity_basic_info['codigoExterno'] : '',
      'codigoHabilitacion': (entity_basic_info['codigoHabilitacion']) ? entity_basic_info['codigoHabilitacion'] : '',
      'codigoCIIU': (entity_basic_info['codigoCIIU']) ? entity_basic_info['codigoCIIU'] : '',
      'tipoSociedad': (entity_basic_info['tipoSociedad']) ? entity_basic_info['tipoSociedad'] : '',
    }
    self.fnSetUopdateBasicInfoEntity(objSendService, this.token, function(resp_doctor) {
      if (resp_doctor.status == 200 || resp_doctor.status == 201 || resp_doctor.status == 204) {
        self.fnGetDataEntityById(self.entity_id, self.token);
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Información actualizada satisfactoriamente', 'nb-alert');
      } else {
        self.submitted = false;
        // self.data_user_basic_info = {};
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
      }
    });
  }

  fnSetUopdateBasicInfoEntity(object_data, token, callback) {
    // Instancia de conexion servicio
    this.entityService.fnHttpPutUpdateInfoBasicEntity(this.entity_id, token, object_data).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

}
