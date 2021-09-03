import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-delete-phone-number',
  templateUrl: './entity-delete-phone-number.component.html',
  styleUrls: ['./entity-delete-phone-number.component.scss'],
})
export class EntityDeletePhoneNumberComponent implements OnInit {

  @Input() data_entity: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  index: any = null;
  token: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    public router: Router,
    private entityService: EntityService,
    protected ref: NbDialogRef<EntityDeletePhoneNumberComponent>,
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
      self.index = self.data_entity['index'];
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelDeletePhoneUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnDeletePhoneUser(user_data) {
    const self = this;
    self.submitted = true;
    const data_entity = [
      {
        'op' : 'remove',
        'path' : 'Telefonos/' + self.index,
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.data_entity['entity_id'], data_entity).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico eliminado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico eliminado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
