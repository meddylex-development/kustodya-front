import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";
import { UserService } from '../../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-edit-admin-signature',
  templateUrl: './edit-admin-signature.component.html',
  styleUrls: ['./edit-admin-signature.component.scss']
})
export class EditAdminSignatureComponent implements OnInit {

  collection_user: any = [];
  @Input() data_signature_admin;
  @Input() list_signature_admin;
  submitted: boolean = false;
  current_payload: any = null;
  input_search: any = '';
  id_entity: number = 0;
  current_page_users: number = 1;
  total_pages_users: number = 1;

  constructor(protected ref: NbDialogRef<EditAdminSignatureComponent>,
    private utilitiesService: UtilitiesService,
    private userService: UserService,
    private parameterizationService: ParameterizationService,
  ) { }

  ngOnInit() {
    const self = this;
    // self.data_signature_admin
    self.current_payload = sessionStorage.getItem('payload');
    self.id_entity = JSON.parse(atob(self.current_payload.split(".")[1])).Entidad;
    self.fnGetUsersList(self.current_payload, self.id_entity, self.input_search, self.current_page_users)
  }

  fnUpdateSignatureAdmin(data_signature_admin) {
    // this.submitted = true;

    let object_send = {
      'gerente': (this.data_signature_admin['rol'] == 'Gerente') ? data_signature_admin['usuarioId'] : this.list_signature_admin[0]['usuarioId'],
      'coordinador': (this.data_signature_admin['rol'] == 'Coordinador') ? data_signature_admin['usuarioId'] : this.list_signature_admin[1]['usuarioId'],
      'interventor': (this.data_signature_admin['rol'] == 'Interventor') ? data_signature_admin['usuarioId'] : this.list_signature_admin[2]['usuarioId'],
      'aprobador': (this.data_signature_admin['rol'] == 'Aprobador') ? data_signature_admin['usuarioId'] : this.list_signature_admin[3]['usuarioId'],
      'cargoGerente': (this.data_signature_admin['rol'] == 'Gerente') ? data_signature_admin['cargo'] : this.list_signature_admin[0]['cargo'],
      'cargoCoordinador': (this.data_signature_admin['rol'] == 'Coordinador') ? data_signature_admin['cargo'] : this.list_signature_admin[1]['cargo'],
      'cargoInterventor': (this.data_signature_admin['rol'] == 'Interventor') ? data_signature_admin['cargo'] : this.list_signature_admin[2]['cargo'],
    };
    // return false;
    object_send[data_signature_admin.rol.toLowerCase()] = data_signature_admin.usuarioId;
    this.parameterizationService.fnHttpSetUpdateSignatureAdmin(this.current_payload, object_send).subscribe(r => {
      if (r.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la firma con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

  fnGetUsersList(current_payload, entity_id, search_input, currentPage) {
    const self = this;
    self.userService.fnHttpGetDataUsersByIdEntity(current_payload, entity_id, search_input, currentPage).subscribe(response_users => {
      if (response_users.status == 200) {
        self.collection_user = currentPage == 1 ? response_users.body.usuariosOutputModel : self.collection_user.concat(response_users.body.usuariosOutputModel);
        self.current_page_users = response_users.body.paginacion.paginaActual;
        self.total_pages_users = response_users.body.paginacion.totalPaginas;

        if(currentPage == 1) {
          let object_none = {
            id: 0,
            identificacion: "0",
            nombre: "Ninguno"
          }
          self.collection_user.unshift(object_none);
        }
      }
    }, err => {

    });
  }

  onScrollToEnd() {
    let siguiente_pagina = this.current_page_users + 1;
    if(siguiente_pagina <= this.total_pages_users) {
      this.fnGetUsersList(this.current_payload, this.id_entity, this.input_search, siguiente_pagina);
    }
  }

  fnSearchPuc(event) {
    this.input_search = event.term;
    this.fnGetUsersList(this.current_payload, this.id_entity, this.input_search, 1);
  }

  fnCancelUpdateSignatureAdmin() {
    this.submitted = false;
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
