import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-add-social-network',
  templateUrl: './entity-add-social-network.component.html',
  styleUrls: ['./entity-add-social-network.component.scss'],
})
export class EntityAddSocialNetworkComponent implements OnInit {

  @Input() data_entity: any;
  submitted: boolean = false;
  user_id: any = null;
  entity_data: any = {};
  token: any = null;

  collection_social_networks_type: any = [
    { 'id': 1, 'descripcion': 'Facebook'},
    { 'id': 2, 'descripcion': 'Twitter'},
    { 'id': 3, 'descripcion': 'LinkedIn'},
  ];

  constructor(
    private utilitiesService: UtilitiesService,
    public router: Router,
    private entityService: EntityService,
    protected ref: NbDialogRef<EntityAddSocialNetworkComponent>,
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
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelCreateNewSocialNetworkEntity() {
    this.submitted = false;
    this.dismiss();
  }

  fnCreateNewSocialNetworkEntity(entity_data) {
    const self = this;
    self.submitted = true;
    const data_user = [
      {
        'op' : 'add',
        'path' : 'RedesSociales/-',
        'value' : {
          'EntidadId': self.data_entity['entity_id'],
          'RedSocial': parseInt(entity_data['social_network_type'], 10),
          'NombreUsuarioOLink': entity_data['social_network_user'],
        },
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.data_entity['entity_id'], data_user).subscribe(r => {
      if (r.status == 204) {
        self.entity_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Red social agregada correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Red social agregada correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
