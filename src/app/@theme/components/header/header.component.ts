import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { SignOutService } from '../../../shared/api/services/sign-out.service';
/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { PagesComponent } from '../../../pages/pages.component';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { MyAccountService } from '../../../shared/api/services/my-account.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { TemperatureHumidityService } from '../../../@core/mock/temperature-humidity.service';

declare var $: any;
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  // template: `<nb-layout-header fixed>
  //   <nb-user [name]='user?.name' [picture]='user?.picture'></nb-user>
  // </nb-layout-header>`,
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any = {};
  data_select: any = 1;
  errors: any = null;
  // user: any;

  userMenu = [
    { title: 'Mi perfil' },
    { title: 'Términos y condiciones' },
    { title: 'Cerrar sesión' },
  ];

  loadingEPS: boolean = false;
  list_EPS: any = [];
  list_EPSByUser: any = [];
  Ideps: number = -1;
  currentEPS: any = null;
  list_IPS: any = [];
  Idips: number = -1;
  currentIPS: any = null;
  loadingIPS: boolean = false;

  token: any = null;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private signOutService: SignOutService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private pagesComponent: PagesComponent,
    private utilitiesService: UtilitiesService,
    private myAccountService: MyAccountService,
    public router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService,
    private incapacityService: IncapacityService) {
    if (this.utilitiesService.dataChangeObserver == undefined) {
      this.utilitiesService.dataChange.subscribe();
    }
  }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      $('nb-context-menu').css('border', 'none');
    });
    self.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        self.user = token.getPayload();
        self.user['name'] = self.user['given_name'] + ' ' + self.user['family_name'];
      }
    });

    self.token = self.utilitiesService.fnGetToken();
    self.user.name = JSON.parse(self.utilitiesService.fnGetUser())['name'];

    if (self.token == null || self.token == undefined) {
      self.router.navigateByUrl('');
    }

    self.fnGetEPSByUser(function(response_eps){
      self.fnGetAllEPS(response_eps);
    });
    self.menuService.onItemClick().subscribe((event) => {
      self.onItemSelection(event);
    });
  }

  onItemSelection(event) {
    switch (event.item.title) {
      case 'Mi perfil':
        this.myAccountService.showMyAccount({ 'showMyAccount': true });
        // this.router.navigate(['/pages/my-account']);
        break;
      // case  'Ajustes':
      //   this.router.navigate(['/pages/my-account']);
      //   break;
      case 'Cerrar sesión':
        this.router.navigate(['/auth/login']);
        this.utilitiesService.fnDestroySessionData(function (res_clean_session) {
          // Destroy session callback
        });
        break;
      case 'Términos y condiciones':
        this.myAccountService.showMyAccount({ 'showTermsConditions': true });
        break;
    }
  }

  fnSetDataUser(user_name) {
    this.user['name'] = user_name;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  fnGoHome() {
    // this.pagesComponent.fnSetMenuCommonNavigation();
    // this.router.navigate(['/pages/list-companies']);
    // this.router.navigate(['/pages/projects']);
  }

  onMenuClick() {
    // Click menu
  }
  fntest(data_select) {
    this.utilitiesService.setData({ attr: data_select });
  }

  fnGetEPSByUser(callback) {
    this.incapacityService.fnHttpGetEPSbyUser(this.token).subscribe((result) => {
      if (result.status == 200) {
        // this.list_EPSByUser = result.body;
        callback(result.body);
      }
    });
  }
  fnGetAllEPS(response_eps) {
    this.loadingEPS = true;
    this.currentEPS = null;
    this.Ideps = null;
    this.incapacityService.fnHttpGetAllEPS(this.token).subscribe((result) => {
      if (result.status == 200) {
        this.list_EPS = result.body;
        if (this.list_EPS.length > 0 && response_eps != null) {
          var col = this.utilitiesService.getCol(response_eps, 'epsId');
          this.list_EPS = this.list_EPS.filter(e => col.includes(e.iIdeps));
          this.Ideps = this.list_EPS[0].iIdeps;
          this.currentEPS = this.list_EPS.filter(e => e.iIdeps == this.Ideps)[0]; // this.list_EPS[0];
          this.utilitiesService.setEPS(this.currentEPS);
          if (this.Ideps > 0) {
            this.fnGetAllIPSByEps();
          }
        }
        else {
          this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
          this.utilitiesService.showToast('bottom-right', 'danger', 'No tiene una EPS asignada!', 'nb-alert');
          this.router.navigateByUrl('');
        }
      } else {
        this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las EPS(s)', 'nb-alert');
      }
      this.loadingEPS = false;
    }, error => {
      this.loadingEPS = false;
      if (error.status == '401') {
        this.router.navigateByUrl('');
      }
      else {
        this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
      }
    });
  }

  fnCleanIPS() {
    this.Idips = -1;
    this.list_IPS = [];
    const new_item: any = { iIdips: -1, tNombre: 'Seleccione IPS' };
    this.list_IPS.unshift(new_item);
    this.currentIPS = null;
  }

  onChangeEPS() {
    this.fnCleanIPS();
    if (this.Ideps != null && this.Ideps > 0) {
      this.currentEPS = this.list_EPS.filter(e => e.iIdeps == this.Ideps)[0];
      this.fnGetAllIPSByEps();
    } else if (this.list_EPS.length > 0) {
      this.Ideps = this.list_EPS[0].iIdeps;
      if (this.Ideps > 0) {
        this.fnGetAllIPSByEps();
      }
    } else {
      this.utilitiesService.showToast('bottom-right', 'danger', 'No tiene una EPS asignada!', 'nb-alert');
      this.router.navigateByUrl('');
    }

    this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
  }

  fnGetAllIPSByEps() {
    this.loadingIPS = true;
    let self = this;
    this.incapacityService.fnHttpGetAllIPSByEps(this.token, this.Ideps).subscribe((result) => {
      if (result.status == 200) {
        self.list_IPS = result.body;
        if (self.list_IPS.length > 0) {
          self.Idips = self.list_IPS[0].iIdips;
          self.currentIPS = self.list_IPS[0];
          self.utilitiesService.setIPS(self.currentIPS);
        } else {
          this.fnCleanIPS();
        }
      } else {
        self.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las IPS(s)', 'nb-alert');
      }
      this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
      self.loadingIPS = false;
    }, error => {
      self.loadingIPS = false;
      self.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
    });
  }

  onChangeIPS() {
    if (this.Idips < 0 || this.Idips == null) {
      this.utilitiesService.showToast('bottom-right', 'danger', 'IPS requerida', 'nb-alert');
      this.Idips = this.list_IPS[1].iIdips;
    }
    else {
      this.currentIPS = this.list_IPS.filter(e => e.iIdips == this.Idips)[0];
    }

    this.utilitiesService.setData({ ips: this.currentIPS, eps: this.currentEPS });
  }
}
