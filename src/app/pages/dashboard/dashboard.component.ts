import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PagesComponent } from '../pages.component';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { UtilitiesService } from './../../shared/api/services/utilities.service';
import { UserService } from './../../shared/api/services/user.service';
import { MyAccountService } from './../../shared/api/services/my-account.service';
declare var $: any;

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {

  object_incapacity: any = {};

  visible: boolean = false;
  menu_items: any = [];
  sub_menu2: any[] = [{ 'icon': 'fas fa-wrench', 'title': 'tercer sub-menu' }];
  show_cards: any = 0;
  show_data_menu: any = null;

  item_children: Object = {};
  item_menu_children: Array<[]> = [];
  items_second_menu: Array<[]> = [];
  // collection_levels_menu: Object = {};
  collection_levels_menu: any = [];
  level_menu: any = 5;
  token: any = null;
  entity: number = -1;
  cun: string = null;
  title_name_module: String = '';
  current_item: any = {};
  current_level_menu: Number = 1;
  obj_data_bread_crumb: any = {};
  url_iframe_content: any = null;
  content_user_profile: any = null;
  content_terms_conditions: any = null;

  display_side_bar_one: Boolean = true;
  display_side_bar_two: Boolean = false;

  collapse_side_bar_one: Boolean = false;
  collapse_side_bar_two: Boolean = false;
  show_content: Boolean = false;
  menu_items_original: any = null;

  flag_find_rethus: any = null;
  enum_document_type: any = null;
  document_number: any = null;
  section_navigate: any = null;

  constructor(
    private pagesComponent: PagesComponent,
    public router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private utilitiesService: UtilitiesService,
    private userService: UserService,
    private myAccountService: MyAccountService,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;

    $(document).ready(function () {
      $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
      $('.menu-sidebar').removeClass('d-block').addClass('d-none');
      $('#toggle-settings').removeClass('was-expanded').addClass('was-collapse'); // Hide right sidebar to this component
      $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */

    self.myAccountService.dataChangeMyAccount.subscribe((data) => {
      if (data['showMyAccount']) {
        self.menu_items = self.menu_items_original;
        // self.fnCollapse('sidebar');
        $('#sidebar').toggleClass('active');
        self.collapse_side_bar_one = false;
        $('.przss-content-child-menu').css('display', 'none');
        self.url_iframe_content = null;
        self.content_user_profile = true;
        self.content_terms_conditions = false;
      } else if(data['showTermsConditions']) {
        self.menu_items = self.menu_items_original;
        $('#sidebar').toggleClass('active');
        self.collapse_side_bar_one = false;
        $('.przss-content-child-menu').css('display', 'none');
        self.url_iframe_content = null;
        self.content_terms_conditions = true;
        self.content_user_profile = false;
      } else {
        self.url_iframe_content = null;
        self.content_user_profile = false;
        self.content_terms_conditions = false;
      }
    });

    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.entity = params.entity;
        if (params.cun && params.cun != 'null') {
          self.cun = params.cun;
        }
        self.fnGetMenuDashboard(self.token, self.entity, null, null, function (resp) {
          if(params.findrethus == '1') {
            self.flag_find_rethus = 1;
            self.section_navigate = '1';
            self.enum_document_type = params.enumdoctype;
            self.document_number = params.docnumber;
            const main_manu_collection = JSON.parse(JSON.stringify(resp['menu_items']));
            console.log('main_manu_collection: ', main_manu_collection);
            main_manu_collection.forEach((value, index) => {
              if (value.id == 528) {
                const menu_rethus = resp['menu_items'][index];
                self.fnShowChildrens(index, menu_rethus);
                self.fnSetLevelData(menu_rethus.menuLevel, menu_rethus.title, resp['menu_items'], menu_rethus.children,  index);
              }
            });
            // self.current_item = resp['menu_items'][3];
            
          } else if(params.findrethus == '2') {
            self.section_navigate = '2';
            self.flag_find_rethus = false;
            self.enum_document_type = null;
            self.document_number = null;
            const main_manu_collection = JSON.parse(JSON.stringify(resp['menu_items']));
            main_manu_collection.forEach((value, index) => {
              if (value.id == 530) {
                const menu_rethus = resp['menu_items'][index];
                // self.fnShowChildrens(index, resp['menu_items']);
                $('#sub_menu_' + index).slideToggle();
                // self.fnSetLevelData(menu_rethus.menuLevel, menu_rethus.title, resp['menu_items'], menu_rethus.children,  index);
                self.fnValidContentSeconBarMenu(resp['menu_items'][index]['children'][1], resp['menu_items'][index]['children'], resp['menu_items'][index], resp['menu_items'], 1, index);
              }
            });
            // self.current_item = resp['menu_items'][3];
            
          } else {
            self.section_navigate = null;
            self.flag_find_rethus = false;
            self.enum_document_type = null;
            self.document_number = null;
          }
        });

      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnClickContainer() {
    if (this.current_item.id == 514) {
      this.utilitiesService.fnHttpGetEntitiesByUser('', 0).subscribe((result) => {
      });
    }
  }

  fnGetMenuDashboard(current_payload, id_entity, id_version?, responseIDMenu?, observer?) {
    const self = this;
    self.pagesComponent.fnSetMenu(current_payload, id_entity, id_version, responseIDMenu, function (resp_menu) {
      self.menu_items = resp_menu.menu_items;
      self.menu_items_original = JSON.parse(JSON.stringify(resp_menu.menu_items));
      if (self.cun != null) {
        self.current_item = self.menu_items.filter(m => m.id == 403)[0].children.filter(s => s.id == 405)[0];
      }
      observer(resp_menu);
    });
  }

  fnCollapse(sidebar) {
    $('#sidebar').css("z-index", 'auto');
    if (sidebar == 'sidebar') {
      $('#sidebar').toggleClass('active');
      this.collapse_side_bar_one = ($('#sidebar').hasClass('active')) ? true : false;
      if (this.collapse_side_bar_one) {
        $('.przss-content-child-menu').css('display', 'none');
      }
    } else if (sidebar == 'sidebar-two') {
      $('#sidebar-two').toggleClass('active');
      this.collapse_side_bar_two = ($('#sidebar-two').hasClass('active')) ? true : false;
      if (this.collapse_side_bar_two) {
        $('.przss-content-child-menu-two').css('display', 'none');
      }
    }
  }

  // fnChangeUrlIframe(index, url) {
  //   this.url_iframe_content = url;
  // }

  // fnToggleSecondMenu() {
  //   if (this.visible) {
  //     this.visible = false;
  //   } else {
  //     this.visible = true;
  //   }
  // }

  fnSetLevelData(level_menu, item_name, collection_level, item_childrens, index_menu) {
    console.log('level_menu: ', level_menu);
    console.log('item_name: ', item_name);
    console.log('collection_level: ', collection_level);
    console.log('item_childrens: ', item_childrens);
    console.log('index_menu: ', index_menu);
    this.title_name_module = item_name;
    const data_collection_breadcrumbs = JSON.parse(JSON.stringify(this.collection_levels_menu));
    this.show_content = false;
    this.current_item = collection_level[index_menu];
    if (collection_level[index_menu]['children'].length < 1) {
      if (collection_level[index_menu]['link'] == "" || collection_level[index_menu]['link'] == null || collection_level[index_menu]['link'] == undefined) {
        this.url_iframe_content = null;
        this.content_user_profile = false;
        this.content_terms_conditions = false;
        setTimeout( resp => {
          this.show_content = true;
          this.userService.fnHttpSetAuditUser(this.token, { 'descripcion': 'Ingreso al modulo - ' + this.current_item['title'], 'accion': 2 }).subscribe(resp => {
          });
        }, 500);
      } else {
        this.url_iframe_content = this.domSanitizer.bypassSecurityTrustResourceUrl(collection_level[index_menu]['link']);
      }
    }

    console.log("this.current_item['id']: ", this.current_item['id']);
    if (this.current_item['id'] == 572) {
      this.fnRedirectResolutionReport();
    }

        
    if (this.current_item['id'] == 579) {
      this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/listado-casos');
    }
        
    if (this.current_item['id'] == 580) {
      this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/listado-casos');
    }
        
    if (this.current_item['id'] == 581) {
      this.utilitiesService.fnNavigateByUrl('pages/calificacion-de-origen/listado-casos');
    }

    this.current_level_menu = level_menu;

    if (level_menu == 1) {
      this.display_side_bar_two = false;

    } else {
      this.display_side_bar_two = true;
    }

    this.collapse_side_bar_two = ($('#sidebar-two').hasClass('active')) ? true : false;

    if (this.collection_levels_menu.length > 0) {
      if (this.collection_levels_menu[level_menu - 1]) {
        this.collection_levels_menu[level_menu - 1] = {
          'item_index': index_menu,
          'item_name': item_name,
          'item_childrens': item_childrens,
          'item_level_menu': level_menu,
          'item_level_collection': collection_level,
        };
      } else {
        this.collection_levels_menu[level_menu - 1] = {
          'item_index': index_menu,
          'item_name': item_name,
          'item_childrens': item_childrens,
          'item_level_menu': level_menu,
          'item_level_collection': collection_level,
        };
      }
    } else {
      this.collection_levels_menu.push(
        {
          'item_index': index_menu,
          'item_name': item_name,
          'item_childrens': item_childrens,
          'item_level_menu': level_menu,
          'item_level_collection': collection_level,
        },
      );
    }


  }

  /************** START - Breadcrumbs **********************/
  fnBreadcrumbsNavigate(ind_module_bradcrumbs, item_level) {
    let collection_bread = [];
    switch (item_level.item_level_menu) {
      case 1:
        this.items_second_menu = [];

        collection_bread = JSON.parse(JSON.stringify(this.collection_levels_menu));
        collection_bread.splice(1, this.collection_levels_menu.length);
        this.collection_levels_menu = collection_bread;
        // this.fnToggleSecondMenu();
        this.title_name_module = item_level.item_name;
        this.display_side_bar_two = false;
        $('.przss-content-child-menu').css('display', 'none');
        $('#sub_menu_' + item_level.item_index).slideToggle();
        if (item_level['item_childrens'].length < 1) {
          this.url_iframe_content = this.domSanitizer.bypassSecurityTrustResourceUrl(item_level['item_level_collection'][item_level['item_index']]['link']);
        } else {
          this.url_iframe_content = null;
        }
        break;
      case 2:
        this.items_second_menu = [];
        this.items_second_menu = item_level['item_childrens'];
        this.title_name_module = item_level.item_name;
        collection_bread = JSON.parse(JSON.stringify(this.collection_levels_menu));
        collection_bread.splice(2, this.collection_levels_menu.length);
        this.collection_levels_menu = collection_bread;
        if (item_level['item_childrens'].length < 1) {
          this.url_iframe_content = this.domSanitizer.bypassSecurityTrustResourceUrl(item_level['item_level_collection'][item_level['item_index']]['link']);
        } else {
          this.url_iframe_content = null;
        }
        break;
      default:
        this.title_name_module = item_level.item_name;
        collection_bread = JSON.parse(JSON.stringify(this.collection_levels_menu));
        collection_bread.splice(item_level['item_level_menu'], this.collection_levels_menu.length);
        this.collection_levels_menu = collection_bread;
        if (item_level['item_childrens'].length < 1) {
          this.url_iframe_content = this.domSanitizer.bypassSecurityTrustResourceUrl(item_level['item_level_collection'][item_level['item_index']]['link']);
        } else {
          this.url_iframe_content = null;
          this.items_second_menu = [];
          this.items_second_menu = item_level['item_childrens'];
        }
        break;
    }
  }
  /************** END - Breadcrumbs **********************/
  /************** START - PRIMER MENU **********************/
  fnShowChildrens(index_menu, item_menu) {
    // this.current_item = item_menu;
    $('.current').removeClass('current');
    $('#sub_menu_' + index_menu).slideToggle();
    $('#item_menu_1_a_' + index_menu).addClass('current');
    $('.current.dropdown-toggle').toggleClass('transform-rotate');

    if (this.collapse_side_bar_one && item_menu != null && item_menu.children.length > 0) {
      this.fnCollapse("sidebar");
    }

    if (this.collapse_side_bar_one) {
      $('.przss-content-child-menu').css('display', 'none');
    }

  }
  fnValidContentSeconBarMenu(item_children, item_menu_children, item_menu, menu_items, index_child, index_menu) {
    $('#sidebar').css("z-index", 1);
    this.items_second_menu = item_children['children'];
    this.fnSetLevelData(2, item_children['title'], item_menu['children'], item_children['children'], index_child);
    this.visible = (this.items_second_menu.length > 0) ? true : false;
    this.display_side_bar_two = (this.items_second_menu.length > 0) ? true : false;

    $('.current').removeClass('current');
    $('#sub_menu_a_' + index_menu + '_' + index_child).addClass('current');

    $('#sub_menu_a_' + index_menu + '_' + index_child).parent().parent().parent().children().addClass('transform-rotate');
  }
  /************** END - PRIMER MENU **********************/
  /************** START - SEGUNDO MENU **********************/
  fnShowChildrensTwoMenu(menu, item_menu_sec, a_tag) {
    this.show_content = false;
    // this.current_item = item_menu_sec;
    $('#' + menu).slideToggle();

    if (a_tag != '' && item_menu_sec.menuLevel >= 4 && item_menu_sec.children.length > 0) {
      $('#' + a_tag).toggleClass('itemWithChildrens');
      // $('#' + ul_tag).toggleClass('itemWithChildrens');
    }

    if (this.collapse_side_bar_two && item_menu_sec.children.length > 0) {
      this.fnCollapse("sidebar-two");
    }

    if (this.collapse_side_bar_two) {
      $('.przss-content-child-menu-two').css('display', 'none');
    }
  }

  fnValidContentMenu(menu_sec, item_menu_sec, index_sec_menu) {
    console.log('menu_sec: ', menu_sec);
    console.log('item_menu_sec: ', item_menu_sec);
    console.log('index_sec_menu: ', index_sec_menu);
    // this.items_second_menu = menu_sec['children'];
    this.fnSetLevelData(item_menu_sec['menuLevel'], item_menu_sec['title'], menu_sec, item_menu_sec['children'], index_sec_menu);
  }
  /************** END - SEGUNDO MENU **********************/
  fnGetDataAccounting(flag: any) {
  }

  fnRedirectResolutionReport() {
    this.utilitiesService.fnSetSessionStorage('dataMenu', JSON.stringify(this.current_item));
    this.utilitiesService.fnNavigateByUrl('pages/reporte/reporte-resolucion');
  }

}
