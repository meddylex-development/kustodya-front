import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../shared/api/services/entity.service';
import { EntityAddOtherInfoComponent } from './entity-add-other-info/entity-add-other-info.component';
import { EntityEditOtherInfoComponent } from './entity-edit-other-info/entity-edit-other-info.component';
import { EntityDeleteOtherInfoComponent } from './entity-delete-other-info/entity-delete-other-info.component';

declare var $: any;

@Component({
  selector: 'ngx-entity-other-info',
  templateUrl: './entity-other-info.component.html',
  styleUrls: ['./entity-other-info.component.scss']
})
export class EntityOtherInfoComponent implements OnInit {

  @Input() dataEntityTab: any;
  public token: string = null;
  public entity_id: any = null;
  public data_entity: any = null;
  public show_table: any = null;
  

  constructor(
    private utilitiesService: UtilitiesService,
    private entityService: EntityService,
    public router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.entity_id = self.dataEntityTab['id'];
        if (self.entity_id) {
          // self.dataEntityTab
          self.fnGetDataInfoEntity(self.token, self.entity_id);
        } else {
          self.router.navigateByUrl('');
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataInfoEntity(token, entity_id) {
    const self = this;
    // self.image_profile_user = null;
    self.fnGetDataEntity(token, entity_id, function (resp_info) {
      if (resp_info.status == 200) {
        self.data_entity = resp_info.body;
      } else {
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      }
    });

  }

  fnGetDataEntity(current_payload, entity_id, callback) {
    this.entityService.fnHttpGetDataEntityById(current_payload, entity_id).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
    });
  }

  showModalAddEntityDataOtherInfo(data_entity) {
    const self = this;
    data_entity['data_entity'] = data_entity;
    self.dialogService.open(EntityAddOtherInfoComponent, { context: data_entity }).onClose.subscribe((res) => {
      self.fnGetDataInfoEntity(self.token, self.entity_id);
    });
  }

  showModalEditEntityDataOtherInfo(index, data_entity, entity_tab) {
    const self = this;
    data_entity['data_entity'] = data_entity;
    data_entity['entity_tab'] = entity_tab;
    data_entity['index'] = index;
    self.dialogService.open(EntityEditOtherInfoComponent, { context: data_entity }).onClose.subscribe((res) => {
      self.fnGetDataInfoEntity(self.token, self.entity_id);
    });
  }

  showModalDeleteEntityDataOtherInfo(index, data_entity, entity_tab) {
    const self = this;
    data_entity['data_entity'] = data_entity;
    data_entity['entity_tab'] = entity_tab;
    data_entity['index'] = index;
    self.dialogService.open(EntityDeleteOtherInfoComponent, { context: data_entity }).onClose.subscribe((res) => {
      self.fnGetDataInfoEntity(self.token, self.entity_id);
    });
  }

}
