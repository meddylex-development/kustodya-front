import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-add-phone-number',
  templateUrl: './entity-add-phone-number.component.html',
  styleUrls: ['./entity-add-phone-number.component.scss'],
})
export class EntityAddPhoneNumberComponent implements OnInit {

  @Input() data_entity: any;
  submitted: boolean = false;
  user_id: any = null;
  entity_data: any = {};
  token: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    public router: Router,
    private entityService: EntityService,
    protected ref: NbDialogRef<EntityAddPhoneNumberComponent>,
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

  fnCancelCreateNewPhoneUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnCreateNewPhoneUser(entity_data) {
    const self = this;
    self.submitted = true;
    const data_user = [
      {
        'op' : 'add',
        'path' : 'Telefonos/-',
        'value' : {
          'EntidadId': self.data_entity['id'],
          'Numero': parseInt(entity_data['phone_number'], 10),
          'Extension': entity_data['extension_number'],
          'Descripcion': entity_data['description_number'],
        },
      },
    ];
    self.entityService.fnHttpSetPatchDataEntity(self.token, self.data_entity['id'], data_user).subscribe(r => {
      if (r.status == 204 || r.status == 201) {
        self.entity_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Número telefónico agregado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
