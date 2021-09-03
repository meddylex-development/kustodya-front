import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-edit-other-info',
  templateUrl: './entity-edit-other-info.component.html',
  styleUrls: ['./entity-edit-other-info.component.scss']
})
export class EntityEditOtherInfoComponent implements OnInit {

  @Input() data_entity: any;
  submitted: boolean = false;
  user_id: any = null;
  entity_id: any = null;
  user_data: any = [];
  category: string = '';
  token: any = null;
  index: any = null;
  data_id: any = null;

  list_row_fields: any = [
    // { 
    //   // 'Categoria': '',
    //   'Nombre': '',
    //   'Valor': '',
    //   'Descripcion': '',
    // }
  ];

  collection_fields: Array<any> = [];

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private entityService: EntityService,
    protected ref: NbDialogRef<EntityEditOtherInfoComponent>,
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
      // self.data_entity
      self.user_id = user_id;
      self.entity_id = self.data_entity['entity_tab']['id'];
      self.index = self.data_entity['index'];
      self.data_id = self.data_entity['id'];
      self.list_row_fields = [
        { 
          'Categoria': self.data_entity['categoria'],
          'Nombre': self.data_entity['nombre'],
          'Valor': self.data_entity['valor'],
          'Descripcion': self.data_entity['descripcion'],
        }
      ];
      self.category = self.data_entity['categoria'];
      $('#kstdya-input_name_field_0').val(self.data_entity['nombre']);
      $('#kstdya-input_value_field_0').val(self.data_entity['valor']);
      $('#kstdya-input_notes_field_0').val(self.data_entity['descripcion']);
      // self.list_row_fields[0]['Categoria'] = self.category;
      // self.fnAddRowFieldsInfoEntity();
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelEditFieldsOtherInfo() {
    this.submitted = false;
    this.dismiss();
  }

  fnEditDataAdditionalInfo(obj_data, callback) {
    const self = this;
    // self.submitted = true;
    const entity_collection = [
      {
        'op' : 'replace',
        'path' : 'Otros/' + self.index,
        'value' : {
          'Id': self.data_id,
          // 'Categoria': obj_data['Categoria'],
          'Categoria': self.category,
          'Nombre': obj_data['Nombre'],
          'Valor': obj_data['Valor'],
          'Descripcion': obj_data['Descripcion'],
        },
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.entity_id, entity_collection).subscribe(r => {
      if (r.status == 204) {
        callback(true);
        // self.submitted = false;
        // self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        callback(true);
        // self.submitted = false;
        // let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        // self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
    }, err => {
      callback(false);
      // self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      // self.submitted = false;
    });
  }

  fnAddRowFieldsInfoEntity(category) {
    const self = this;
    const obj_empty = { 
      'Categoria': category,
      'Nombre': '',
      'Valor': '',
      'Descripcion': '',
    }
    self.list_row_fields.push(obj_empty);
  }

  fnRemoveRowFieldsInfoEntity(index) {
    const self = this;
    if (index != 0) {
      self.list_row_fields.splice(index, 1); 
    }
  }

  fnEditFieldsOtherInfo() {
    const self = this;
    // self.submitted = true;
    self.collection_fields.forEach(function(value, key) {
      self.fnEditDataAdditionalInfo(value, function(res) {
        if (res) {
          self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        } else {
          self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
        }
      })
    })
    
  }

  fnSaveData(ind_row, event) {
    const name = $("#kstdya-input_name_field_" + ind_row).val();
    const value = $("#kstdya-input_value_field_" + ind_row).val();
    const description = $("#kstdya-input_notes_field_" + ind_row).val();
    const obj_empty = { 
      'Categoria': this.category,
      'Nombre': name,
      'Valor': value,
      'Descripcion': description,
    }
    this.collection_fields[ind_row] = obj_empty;
  }

}
