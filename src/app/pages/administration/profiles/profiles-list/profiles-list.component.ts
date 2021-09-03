import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { ProfilesService } from '../../../../shared/api/services/profiles.service';
import { NbDialogService } from '@nebular/theme';

import { DeleteProfilesComponent } from '../delete-profiles/delete-profiles.component';

@Component({
  selector: 'ngx-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
})
export class ProfilesListComponent implements OnInit {

  list_profiles: any = [];
  search_input: any = '';
  loading_state: Boolean = false;
  list_profiles_original: any = [];
  numItemsPage: number = null;
  currentPage: number = 1;
  totalItems: number = null;
  public current_payload: string = null;
  @Output() show_profiles_state = new EventEmitter<number>();

  @Output() id_profile = new EventEmitter<number>();

  constructor(
    private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private profilesService: ProfilesService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetProfilesList(self.current_payload, self.search_input, self.currentPage);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetProfilesList(current_payload, search_input, current_page) {
    const self = this;
    self.loading_state = true;
    self.profilesService.fnHttpGetListProfiles(current_payload, search_input, current_page).subscribe(resp_get_profiles => {
      if (resp_get_profiles.status == 200) {
        self.list_profiles = JSON.parse(JSON.stringify(resp_get_profiles.body.perfiles));
        self.list_profiles_original = JSON.parse(JSON.stringify(resp_get_profiles.body.perfiles));
        self.totalItems = resp_get_profiles.body.paginacion.totalItems;
        self.numItemsPage = resp_get_profiles.body.paginacion.itemsPorPagina;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnShowEditProfiles(profile_data) {
    this.show_profiles_state.emit(3);
    this.id_profile.emit(profile_data.id);
  }

  fnShowModalDeleteProfiles(profile_data) {
    let obj_send = {};
    obj_send['profile_data'] = profile_data;
    this.dialogService.open(DeleteProfilesComponent, {context: obj_send }).onClose.subscribe((res) => {
      this.search_input = '';
      this.fnGetProfilesList(this.current_payload, this.search_input, this.currentPage);
    });
  }

  fnFilter(text_search) {
    this.search_input = text_search;
    this.currentPage = 1;
    this.fnGetProfilesList(this.current_payload, this.search_input, this.currentPage);
  }

  /** Funciones para Pagindo **/
  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetProfilesList(self.current_payload, self.search_input, self.currentPage);
  }
  
  fnCreateProfile(show: number) {
    this.show_profiles_state.emit(show);
  }


}
