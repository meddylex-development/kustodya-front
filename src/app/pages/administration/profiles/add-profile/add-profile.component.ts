import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ProfilesService } from "../../../../shared/api/services/profiles.service";
import { MenuService } from "../../../../shared/api/services/menu.service";
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {

  items_menu: any = [];

  profile_data: any = {};

  menu_selected_data: any = [];
  menu_selected_data_id: any = [];

  current_payload: any = null;
  entity: number = -1;

  show_second_level: any = 0;
  show_third_level: any = 0;
  show_fourth_level: any = 0;
  show_fifth_level: any = 0;
  submitted: any = null;

  loading_state: Boolean = false;

  @Output() show_profiles_state = new EventEmitter<number>();

  constructor(private profilesService: ProfilesService,
    private utilitiesService: UtilitiesService,
    private menuService: MenuService,
    public router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token) {
        self.current_payload = params.token;
        self.entity = parseInt(params.entity, 10);
        self.fnGetMenus(self.current_payload, self.entity);
      } else {
      }
    });
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

  fnCreateNewProfile(profile_data) {
    let menus_list = [];
    this.menu_selected_data_id.forEach(element => {
      let obj_menu = {
        'menuId': element,
      }
      menus_list.push(obj_menu);
    });
    let obj_send = {
      'id': 0,
      'nombre': profile_data.nombre,
      'entidadId': this.entity,
      'activo': true,
      'menus': menus_list,
    }
    this.profilesService.fnHttpPostProfile(this.current_payload ,obj_send).subscribe(resp_post_profiles => {
      if (resp_post_profiles.status == 201) {
        this.fnShowProfilesList(1);
        this.utilitiesService.showToast('top-right', 'success', 'Se ha agregado el perfil con exito!');
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
