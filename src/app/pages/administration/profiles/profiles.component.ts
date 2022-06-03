import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ProfilesService } from '../../../shared/api/services/profiles.service';

@Component({
  selector: 'ngx-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  list_profiles: any = [];
  search_input: any = '';
  list_profiles_original: any = [];
  numItemsPage: number = null;
  currentPage: number = 1;
  totalItems: number = null;
  public current_payload: string = null;
  show_profiles_state: number = 1;
  id_profile: number = 0;
  @Input() state: any;

  constructor( ) { }

  ngOnInit() {
  }

  fnShowOptionsProfiles(show: number) {
    this.show_profiles_state = show;
  }

  fnGetProfileId(id_profile) {
    this.id_profile = id_profile;
  }

}
