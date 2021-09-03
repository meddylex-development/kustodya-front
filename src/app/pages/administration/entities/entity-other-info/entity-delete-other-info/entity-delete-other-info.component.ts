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
  selector: 'ngx-entity-delete-other-info',
  templateUrl: './entity-delete-other-info.component.html',
  styleUrls: ['./entity-delete-other-info.component.scss']
})
export class EntityDeleteOtherInfoComponent implements OnInit {

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
    protected ref: NbDialogRef<EntityDeleteOtherInfoComponent>,
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
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelDeleteDataAditionalInfo() {
    this.submitted = false;
    this.dismiss();
  }

  fnDeleteDataAditionalInfo() {
    const self = this;
    // self.submitted = true;
    const entity_collection = [
      {
        'op' : 'remove',
        'path' : 'Otros/' + self.index,
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.entity_id, entity_collection).subscribe(r => {
      if (r.status == 204) {
        // callback(true);
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Dato eliminado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        // callback(true);
        self.submitted = false;
        // let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Dato eliminado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
