import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { ProfilesService } from '../../../../shared/api/services/profiles.service';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-delete-profiles',
  templateUrl: './delete-profiles.component.html',
  styleUrls: ['./delete-profiles.component.scss'],
})
export class DeleteProfilesComponent implements OnInit {

  @Input() profile_data: any;
  current_payload: any = null;
  entity: number = -1;
  submitted: boolean = false;

  constructor( private utilitiesService: UtilitiesService,
    private profilesService: ProfilesService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteProfilesComponent>) { }

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

  fnSetDeleteProfileById() {
    const self = this;
    self.submitted = true;
    self.profilesService.fnHttpDeleteProfile(self.current_payload, self.profile_data.id).subscribe(resp_delete_profile => {
      if (resp_delete_profile.status == 200) {
        self.dismiss();
        self.submitted = true;
      }
      if (resp_delete_profile.status == 204) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el perfil con exito!');
        self.dismiss();
        self.submitted = false;
      }
    }, err => {

    });
  }

  fnCancelDeleteProfile() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
