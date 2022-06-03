import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { EntityService } from '../../../../shared/api/services/entity.service';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-entity-delete-entity',
  templateUrl: './entity-delete-entity.component.html',
  styleUrls: ['./entity-delete-entity.component.scss'],
})
export class EntityDeleteEntityComponent implements OnInit {

  @Input() data_entity: any;
  current_payload: any = null;
  entity: number = -1;
  submitted: boolean = false;

  constructor( private utilitiesService: UtilitiesService,
    private entityService: EntityService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<EntityDeleteEntityComponent>) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token) {
        self.current_payload = params.token;
        self.entity = params.entity;
      } else {
      }
    });
  }

  fnSetDeleteEntityById() {
    const self = this;
    self.submitted = true;
    self.entityService.fnHttpDeleteEntityById(self.data_entity.id, self.current_payload).subscribe(resp_delete_entity => {
      if (resp_delete_entity.status == 200) {
        self.dismiss();
        self.submitted = true;
      }
      if (resp_delete_entity.status == 204) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el perfil con exito!');
        self.dismiss();
        self.submitted = false;
      }
    }, err => {

    });
  }

  fnCancelDeleteEntity() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
