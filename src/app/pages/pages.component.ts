import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MENU_ITEMS, MENU_ITEMS_CONFIG, MENU_ITEMS_GROUPS_MODULE } from './pages-menu';
import { MENU_ITEMS, MENU_ITEMS_TEST } from './pages-menu';
import { MenuService } from '../shared/api/services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { UtilitiesService } from '../shared/api/services/utilities.service';
import { takeWhile } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: 'pages.component.html',
  // template: `
  //   <nb-card size="xxlarge">
  //     <nb-card-body>
  //       <nb-menu tag="menu" [items]="menuItems"></nb-menu>
  //       <router-outlet></router-outlet>
  //       <h3>Selected item: {{ selectedItem }}</h3>
  //       <button nbButton (click)="addMenuItem()">Add Menu Item</button>
  //       <button nbButton (click)="collapseAll()">Collapse all menu items</button>
  //       <button nbButton (click)="navigateHome()">Home</button>
  //       <button nbButton (click)="getSelectedItem()">Get Selected Item</button>
  //     </nb-card-body>
  //   </nb-card>
  // `,
  // template: `<ngx-sample-layout>
  //     <nb-menu tag="left-menu" class="font_family_roboto" id="pgp-main_content_menu_sidebar" [items]="MENU_ITEMS"></nb-menu>
  //     <router-outlet></router-outlet>
  //   </ngx-sample-layout>`,
})
export class PagesComponent implements OnInit, OnDestroy {
  menu: any = [];
  id_company: any = null;
  link_project: any = null;
  data_item: any = null;
  data_company_object: any = {};

  private alive: boolean = true;
  selectedItem: string;
  private token: any = null;
  private user: any = {};

  MENU_ITEMS_CONFIG: NbMenuItem[] = [];
  MENU_ITEMS: NbMenuItem[] = [];
  MENU_ITEMS_DATA: NbMenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private sidebarService: NbSidebarService,
    private utilitiesService: UtilitiesService,
    private nbMenuService: NbMenuService,
    private route: ActivatedRoute,
    private router: Router) {
    // this.MENU_ITEMS = [];
  }

  ngOnInit() {
    // this.MENU_ITEMS_DATA = MENU_ITEMS_TEST;
    // this.MENU_ITEMS = MENU_ITEMS_TEST;

    this.utilitiesService.fnAuthValidUser().then(response => {
      if (response) {
        this.token = response['token'];
        this.user = response['user'];
        console.log("🚀 ~ file: pages.component.ts ~ line 66 ~ PagesComponent ~ this.utilitiesService.fnAuthValidUser ~ this.user", this.user)
        console.log('this.user: ', this.user);
        // this.fnLoadMenu(this.token);
        this.fnGetMainMenu(this.token, this.user['Entidad']).then((resp: NbMenuItem[]) => {
          console.log('resp: ', resp);
          this.MENU_ITEMS = resp;
          console.log('this.MENU_ITEMS: ', this.MENU_ITEMS);
        });

      } else {
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.utilitiesService.fnNavigateByUrl('auth/login');
        });
      }
    });


    this.nbMenuService.onItemClick().subscribe(response => {
      if (response.tag === 'left-menu') {
        this.data_item = response.item;
        this.data_item['selected'] = true;
        localStorage.setItem('item_menu', JSON.stringify(this.data_item));
        this.MENU_ITEMS.forEach((value, key) => {
          if (value['iIDMenu'] === this.data_item.iIDMenu) {
            this.data_item['selected'] = true;
            value['selected'] = true;
          } else {
            value['selected'] = false;
          }
        });
      }
    });

    this.nbMenuService.getSelectedItem('left-menu').pipe(takeWhile(() => this.alive)).subscribe((menuBag) => {
      // this.selectedItem = menuBag.item.title;
    });
  }

  fnGetMainMenu(token, id_entity) {
    return new Promise((resolve, reject) => {
      try {
          this.menuService.fnHttpGetMenuDashboard(token, id_entity).subscribe(response => {
            let objPromise = response;
            console.log('objPromise: ', objPromise);
            let collectionMenu = objPromise.body;
            console.log('collectionMenu: ', collectionMenu);
            collectionMenu.forEach(element => {
              console.log('element: ', element);
              if (element.children.length < 1) {
                element.children = null;
              } else {
                let collectionSubMenus = element.children;
                collectionSubMenus.forEach(elementSubMenu => {
                  console.log('elementSubMenu: ', elementSubMenu);
                  elementSubMenu.children = null;
                });
              }
            });
            resolve(collectionMenu);
          });
        } catch (error) {
          reject(error);
        }
    });
  }

  fnLoadMenu(token) {
    this.fnGetMenuDashboard(token, 1).then((response) => {
      // this.MENU_ITEMS = response;
      if (response) {
        this.MENU_ITEMS = response['body'];
      } else {
        this.MENU_ITEMS = []
      }
    });
  }

  fnGetMenuDashboard(token, entity_id) {
    return new Promise((resolve, reject) => {
      this.menuService.fnHttpGetMenuDashboard(token, entity_id).subscribe(response => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  getItemsMenuCompany(id_company) {
    return this.MENU_ITEMS = [{
      title: 'Versions',
      icon: 'fas fa-tasks',
      link: '/pages/versions-company/' + id_company,
      home: false,
    }, {
      title: 'Projects',
      icon: 'fas fa-folder-open',
      link: '/pages/projects/' + id_company,
      home: false,
    }, {
      title: 'Members',
      icon: 'fas fa-users',
      link: '/pages/members/' + id_company,
      home: false,
    }, {
      title: 'Settings',
      icon: 'fas fa-tools',
      link: '/pages/settings-company/' + id_company,
      home: false,
    }];
  }

  getItemsMenuProject(id_project) {
    this.MENU_ITEMS = [];
    return this.MENU_ITEMS = [{
      title: 'Versions',
      icon: 'fas fa-tasks',
      link: '/pages/versions-project/' + id_project,
      home: false,
    }, {
      title: 'Profiles',
      icon: 'fas fa-users',
      link: '/pages/groups/' + id_project,
      home: false,
    }, {
      title: 'Settings',
      icon: 'fas fa-tools',
      link: '/pages/settings-project/' + id_project,
      home: false,
    }];
  }

  getMenu() {
    return this.MENU_ITEMS;
  }

  isAdmin() {
    return true;
  }

  fnSetMenu(current_payload, id_entity, id_version, responseIDMenu, observer) {
    const object_data_send = {
      'iIDVersion': id_version,
    };
    let iIDMenu = null;
    if (responseIDMenu == null) {
      iIDMenu = 1;
    } else {
      iIDMenu = responseIDMenu.iIDMenu;
    }
    this.menuService.fnHttpGetMenuDashboard(current_payload, id_entity).subscribe(r => {
      if (r.status == 200) {
        const menuDashbord = r.body;
        console.log('r.body: ', r.body);
        let copyMenuDashbord = [];
        const cards_access = [];
        copyMenuDashbord = menuDashbord;

        const finalMenuVersion: NbMenuItem[] = copyMenuDashbord;
        this.MENU_ITEMS = [];
        this.MENU_ITEMS = finalMenuVersion;
        console.log('this.MENU_ITEMS: ', this.MENU_ITEMS);
        const object_return = {
          'cards': cards_access[0],
          'menu_items': this.MENU_ITEMS,
        };
        observer(object_return);
      } else if (r.status == 206) {
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      } else if (r.status == 401) {
        this.router.navigateByUrl('');
      }
    }, err => {
      if (err.status == 401) {
        this.router.navigateByUrl('');
      }
      observer(err);
      this.utilitiesService.showToast('top-right', '', 'Error consultado el menu!');
    });
  }

  fnSetMenuVersion(current_payload, id_version, responseIDMenu, observer) {
    const object_data_send = {
      'iIDVersion': id_version,
    };
    let iIDMenu = null;
    if (responseIDMenu == null) {
      iIDMenu = 1;
    } else {
      iIDMenu = responseIDMenu.iIDMenu;
    }

    this.menuService.fnHttpGetMenuVersions(current_payload, id_version).subscribe(r => {
      if (r.status == 200) {
        const menuVersion = r.body;
        const copyMenuVersion = [];
        const cards_access = [];
        menuVersion.forEach(element => {
          copyMenuVersion.push({
            'title': element.tMenuName,
            'icon': element.tMenuIcon,
            // 'link': '/pages/home/' + id_version,
            'selected': ((element.tMenuName == 'Market') ? true : false),
            'link': element.cards[0].tPathCard ? element.cards[0].tPathCard + id_version : '/pages/home/' + id_version,
            'home': ((element.tMenuName == 'Market') ? true : false),
            'iIDMenu': element.iIDMenu,
            'cards': element.cards,
          });
          if (element.iIDMenu == iIDMenu) {
            cards_access.push(element.cards);
            // observer(element.cards);
          }
        });
        const finalMenuVersion: NbMenuItem[] = copyMenuVersion;
        // this.menu = finalMenuVersion;
        this.MENU_ITEMS = [];
        this.MENU_ITEMS = finalMenuVersion;
        const object_return = {
          'cards': cards_access[0],
          'menu_items': this.MENU_ITEMS,
        };
        observer(object_return);
      }
    }, err => {
      observer(err);
    });
  }


  getSelectedItem() {
    this.nbMenuService.getSelectedItem('left-menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe((menuBag) => {
        // this.selectedItem = menuBag.item.title;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
