import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../../shared/api/services/user.service';
import { ProfilesService } from '../../../shared/api/services/profiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../shared/api/services/entity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

@Component({
  selector: 'ngx-rehabilitation-concept-tabs',
  templateUrl: './rehabilitation-concept-tabs.component.html',
  styleUrls: ['./rehabilitation-concept-tabs.component.scss'],
})
export class RehabilitationConceptTabsComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public profilesService: ProfilesService,
    public entityService: EntityService,
    private incapacityService: IncapacityService,
    public utilitiesService: UtilitiesService,
  ) { }

  data_user: any = {};
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_admin: boolean = false;
  content_tab_logo: boolean = false;
  content_tab_others: boolean = false;
  @Input() data_object: any;
  @Output() flagCreateEntity = new EventEmitter<object>();
  token: any = null;
  required: any = true;
  submitted: any = false;
  collection_cie_10: any = [];
  errors: string[] = [];
  list_cie10: any = [];
  diagnosis: any = '';
  read_only: boolean = false;
  load_data: boolean = false;

  ngOnInit() {
    // // this.data_object
    // this.fnGetCie10(1);

    const self = this;
    // self.data_object
    // self.flagCreateEntity
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.fnGetCie10(1);
      } else {
        // self.router.navigateByUrl('');
      }
    });
  }

  fnShowGoBackList() {
    const object_data_entity = {
      'tab_id': 1,
      'data_object': {id: 0, nombre: ''},
    };
    this.flagCreateEntity.emit(object_data_entity);
  }

  fnGetCie10(type_cie10) {
    this.errors = [];
    this.submitted = true;
    this.load_data = true;
    this.incapacityService.fnHttpGetCie10(this.token, type_cie10).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        this.list_cie10 = result.body;
        let new_item: any = { iIdcie10: -1, tFullDescripcion: '' };
        this.list_cie10.unshift(new_item);
        this.collection_cie_10[type_cie10 - 1] = result.body;
        this.load_data = false;
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
    });
  }

}
