import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthJWTToken, NbAuthResult, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EntityService } from '../../../shared/api/services/entity.service';
import { UserService } from '../../../shared/api/services/user.service';
declare var $: any;
declare var grecaptcha: any;

@Component({
  selector: 'ngx-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {

  // submitted = false;
  // errors: string[] = [];
  // text_errors: any = [];
  // messages: string[] = [];
  // user: any = {};
  // private index: number = 0;

  required: Boolean = true;
  minlength: Number = 8;
  maxlength: Number = 50;
  aria_invalid: Boolean = true;

  redirect: any;
  token: string;
  userId: number;
  name: string;
  cun: string = null;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  // show_download_document: Boolean = true;
  przs_form_download_document: any = {};
  submitted: boolean = false;
  rememberMe = false;

  code_error_api: string = null;
  siteKeyCaptcha: string = '6LfM9qgUAAAAAFUCNSEiwkXNRyfE3nM4337jz2p9';
  siteKeyCaptcha_1: string = '6LfM9qgUAAAAAKVbtPsWe9Yr8mRTrS04NUSLxlAl';
  terms_and_conditions: Boolean = true;
  captcha_valid: Boolean = null;

  state_loading: Boolean = true;
  url_redirect: any = null;
  saml_auth: Boolean = true;

  show_entities: Boolean = true;
  list_entities: any = [];
  current_entity: number = -1;
  error_entity = false;
  user_data: any = '';

  user_admin: boolean = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private entityService: EntityService,
    private userService: UserService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {

    this.fnClean();

    $(document).ready(function () { });

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = "user";//this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');

    this.user.tlanguage = 'en';

    this.activatedRoute.params.subscribe(params => {
      if (params['cun']) {
        try {
          this.cun = params['cun'];
          // this.fnGetEntities();
        }
        catch{
          this.show_entities = false;
          this.utilitiesService.showToast('bottom-right', 'danger', "Token invalido", 'nb-alert');
          this.router.navigateByUrl('');
        }
      }
    });
  }

  fnClean() {
    this.list_entities = [];
    this.user = {};
    this.show_entities = false;
    this.token = "";
    this.redirect = "";
    this.errors = [];
  }

  login() {

    const self = this;
    self.errors = [];
    self.messages = [];
    self.submitted = true;

    if ((self.token === '' || self.token === undefined) && self.user['tPassword'] && self.list_entities.length === 0) {
      const obj_user_account = {
        'password': self.user['tPassword'],
        'user': self.user['tEmail'],
        'rememberMe': true,
      };
      self.service.authenticate(self.strategy, obj_user_account).subscribe((resultAuth: NbAuthResult) => {
        console.log('NbAuthResult: ', NbAuthResult);

        if (resultAuth.isSuccess() && resultAuth.getMessages()[0]['status'] === 200) {
          self.messages = resultAuth.getMessages();
          console.log('self.messages: ', self.messages);
          self.token = self.messages[0]['body']['token'];
          self.utilitiesService.fnSetToken(self.token);
          self.userId = self.messages[0]['body']['userId'];
          self.user_data = JSON.stringify(self.messages[0]['body']['usuario']);
          self.utilitiesService.fnSetSessionStorage('user_id', self.userId);
          self.utilitiesService.fnSetSessionStorage('user_data', self.user_data);
          self.utilitiesService.fnSetSessionStorage('user_session', self.user['tEmail']);
          self.user = self.messages[0]['body'];
          self.utilitiesService.fnsetUser(self.user);

          self.user_admin = self.messages[0]['body']['superAdmin'];
          self.utilitiesService.fnSetSessionStorage('isSuperAdmin', self.user_admin);
          const data_payload = self.utilitiesService.fnDecodePayload(self.token);

          self.redirect = resultAuth.getRedirect();
          self.fnGetEntities();
        } else {
          self.errors = resultAuth.getErrors();
          self.utilitiesService.showToast('bottom-right', 'danger', "El nombre de usuario o la contraseña son incorrectos.", 'nb-alert');
          self.submitted = false;
          self.cd.detectChanges();
        }
      }, error => {
        self.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        self.submitted = false;
        self.cd.detectChanges();
      });
    } else {
      if (self.redirect == '') {
        self.redirect = 'pages/dashboard';
      }
      if (self.current_entity <= 0) {
        $('#przss-select-entity').addClass('ng-invalid');
        $('#przss-select-entity').addClass('ng-touched');

        self.error_entity = true;
      } else if (self.current_entity > 0 && self.redirect) {
        self.error_entity = false;
        $('#przss-select-entity').removeClass('ng-invalid');
        $('#przss-select-entity').removeClass('ng-touched');
        self.current_entity = 1;
        self.userService.fnHttpSetAuditUser(self.token, { 'descripcion': 'Inicio sesion', 'accion': 2 }).subscribe(resp => {
        });;
        setTimeout(() => {
          return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun); // Your redirection goes here
        }, self.redirectDelay);
      }
      self.submitted = false;
      self.cd.detectChanges();
    }
  }

  fnGetEntities() {
    const self = this;
    self.errors = [];
    self.submitted = true;
    self.current_entity = null;
    if (!self.user_admin) {
      self.entityService.fnHttpGetListEntitiesUserCommon(self.token, '').subscribe((result) => {
        if (result.status == 200) {
          self.list_entities = result.body;
          if (self.list_entities.length < 1) {
            self.show_entities = false;
            self.fnClean();
            self.utilitiesService.showToast('bottom-right', 'warning', 'No tiene una entidad asignada.', 'fa fas-user');
          } else if (self.list_entities.length > 1) {
            self.show_entities = true;
            self.current_entity = self.list_entities;
            // if (self.redirect) {
            //   setTimeout(() => {
            //     return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun); // Your redirection goes here
            //   }, self.redirectDelay);
            // }
          } else {
            // self.show_entities = true;
            // const new_entity = { id: -1, tNombreComercial: 'Select Entity...' };
            // self.list_entities.unshift(new_entity);
            self.current_entity = self.list_entities[0]['id'];
            self.userService.fnHttpSetAuditUser(self.token, { 'descripcion': 'Inicio sesion', 'accion': 2 }).subscribe(resp => {
            });
            return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun + '/null/null/null'); // Your redirection goes here
          }
        } else {
          self.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las empresas', 'nb-alert');
        }
        self.submitted = false;
        self.cd.detectChanges();
      }, error => {
        self.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        self.submitted = false;
        self.cd.detectChanges();
      });
    } else {
      self.current_entity = 1;
      self.current_entity = 1;
      self.userService.fnHttpSetAuditUser(self.token, { 'descripcion': 'Inicio sesion', 'accion': 2 }).subscribe(resp => {
      });
      return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun + '/null/null/null'); // Your redirection goes here
    }

    // if (!self.user_admin) {
    //   self.entityService.fnHttpGetListEntitiesUserCommon(self.token, '').subscribe((result) => {
    //     if (result.status == 200) {
    //       self.list_entities = result.body;
    //       if (self.list_entities.length < 1) {
    //         self.fnClean();
    //         self.utilitiesService.showToast('bottom-right', 'warning', 'No tiene una entidad asignada.', 'fa fas-user');
    //       } else if (self.list_entities.length === 1) {
    //         self.current_entity = self.list_entities[0].id;
    //         if (self.redirect) {
    //           setTimeout(() => {
    //             return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun); // Your redirection goes here
    //           }, self.redirectDelay);
    //         }
    //       } else {
    //         self.show_entities = true;
    //         const new_entity = { id: -1, tNombreComercial: 'Select Entity...' };
    //         self.list_entities.unshift(new_entity);
    //       }
    //     } else {
    //       self.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las empresas', 'nb-alert');
    //     }
    //     self.submitted = false;
    //     self.cd.detectChanges();
    //   }, error => {
    //     self.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
    //     self.submitted = false;
    //     self.cd.detectChanges();
    //   });
    // } else {
    //   self.current_entity = 1;
    //   return self.router.navigateByUrl(self.redirect + '/' + self.token + '/' + self.current_entity + '/' + self.cun); // Your redirection goes here
    // }


  }

  onChangeEntities() {
    if (this.current_entity <= 0) {
      $('#przss-select-entity').addClass('ng-invalid');
      $('#przss-select-entity').addClass('ng-touched');

      this.error_entity = true;
    }
    else if (this.current_entity > 0) {
      this.error_entity = false;
      $('#przss-select-entity').removeClass('ng-invalid');
      $('#przss-select-entity').removeClass('ng-touched');
    }
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }
}
