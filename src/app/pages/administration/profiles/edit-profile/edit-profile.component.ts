import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ProfilesService } from "../../../../shared/api/services/profiles.service";
import { MenuService } from "../../../../shared/api/services/menu.service";
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  
  @Input() id_profile: any;
  @Output() show_profiles_state = new EventEmitter<number>();
  items_menu: any = []
  menu_selected_data: any = [];
  menu_selected_data_id: any = [];

  entity: number = -1;
  show_second_level: any = 0;
  show_third_level: any = 0;
  show_fourth_level: any = 0;
  show_fifth_level: any = 0;
  profile_data: any = {};
  submitted: any = null;
  loading_state: Boolean = false;
  public current_payload: string = null;
  public entity_id: string = null;
  public user_id: string = null;
  public isSuperAdmin: any = null;
  public token: any;
  public dataSession;

  constructor(
    private profilesService: ProfilesService,
    private utilitiesService: UtilitiesService,
    private menuService: MenuService,
    public router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService,
    ) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token["token"];
        this.dataSession = token.getPayload();
        
        this.current_payload = this.token;
        this.entity_id = this.dataSession['Entidad'];
        this.entity = this.dataSession['Entidad'];
        this.user_id = this.dataSession['UserId'];
        this.isSuperAdmin = (this.dataSession['EsSuperAdmin'] == "True") ? true : false;
        this.fnGetMenus(this.current_payload, this.entity_id);
        this.fnGetInfoProfile(this.current_payload, this.id_profile);
      }
    });
    // const self = this;
    // self.route.params.subscribe(params => {
    //   if (params.token) {
    //     self.current_payload = params.token;
    //     self.entity = params.entity;
    //     self.fnGetMenus(self.current_payload, self.entity);
    //     self.fnGetInfoProfile(self.current_payload, self.id_profile);
    //   } else {
    //   }
    // });
  }
  
  fnGetMenus(current_payload, id_entity) {
    this.loading_state = true;
    this.menuService.fnHttpGetMenuDashboard(current_payload, id_entity).subscribe(r => {
      if (r.status == 200) {
        this.items_menu = r.body;
        this.loading_state = false;
      }
       if (r.status == 206) {
        this.loading_state = false;
      }
      else if (r.status == 401) {
        this.router.navigateByUrl('');
      }
    }, err => {
      if (err.status == 401) {
        this.router.navigateByUrl('');
      }
      this.utilitiesService.showToast('top-right', '', 'Error consultando el menu!');
    });
  }



  fnGetInfoProfile(current_payload, id_profile) {
    const self = this;
    self.profilesService.fnHttpGetInfoProfileById(current_payload, id_profile).subscribe(resp_get_info => {
      if (resp_get_info.status == 200) {
        self.profile_data = resp_get_info['body'];
        resp_get_info['body']['menus'].forEach(element => {
          self.menu_selected_data_id.push(element.id);
        });
      }
    }, err => {

    });
  }

  fnUpdateProfile(profile_data) {
    let menus_list = [];
    this.menu_selected_data_id.forEach(element => {
      let obj_menu = {
        'menuId': element,
      }
      menus_list.push(obj_menu);
    });
    profile_data['menus'] = menus_list;
    this.profilesService.fnHttpUpdateProfile(this.current_payload, profile_data, this.id_profile).subscribe(resp_post_profiles => {
      if (resp_post_profiles.status == 204) {
        this.fnShowProfilesList(1);
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado el perfil con exito!');
      }
    }, err => {

    });
  }

  fnUpdateArrayMenus(item_menu, fathers_array?) {
    let id_menu = item_menu.id;
    let index_of = this.menu_selected_data_id.indexOf(id_menu);
    if(index_of < 0) {
      this.fnUpdateFatherNode(fathers_array);
      this.menu_selected_data_id.push(item_menu.id);
      item_menu['children'].forEach(element => {
        // this.fnUpdateArrayMenus(element, item_menu.id);
        this.fnAddChildren(element);
      });
      
    }
    if(index_of >= 0){
      this.menu_selected_data_id.splice(index_of, 1);
      item_menu['children'].forEach(element => {
        // this.fnUpdateArrayMenus(element, item_menu.id);
        this.fnRemoveChildren(element)
      });
    }
  }

  fnAddChildren(children) {
    if(this.menu_selected_data_id.indexOf(children.id) < 0) {
      this.menu_selected_data_id.push(children.id);
    }
    children['children'].forEach(element => {
      this.fnAddChildren(element)
    });
  }

  fnRemoveChildren(children) {
    if(this.menu_selected_data_id.indexOf(children.id) >= 0) {
      this.menu_selected_data_id.splice(this.menu_selected_data_id.indexOf(children.id), 1);
    }
    children['children'].forEach(element => {
      this.fnRemoveChildren(element)
    });
  }

  fnShowProfilesList(show: number) {
    this.show_profiles_state.emit(show);
  }

  
  fnUpdateFatherNode(fathers_array) {
    fathers_array.forEach(element => {
      let index_of = this.menu_selected_data_id.indexOf(element);
      if(index_of < 0) {
        this.menu_selected_data_id.push(element);
       }
    });
  }

}
