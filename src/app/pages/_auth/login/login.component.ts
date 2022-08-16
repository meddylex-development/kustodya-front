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

    this.utilitiesService.fnAuthValidUser().then(response => {
      if (response) {
        this.redirect = 'pages/dashboard';
        this.utilitiesService.fnNavigateByUrl(this.redirect);
        this.submitted = false;
        // this.cd.detectChanges();
      } else {
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.fnClean();
        });
      }
    });

    // this.activatedRoute.params.subscribe(params => {
    // });
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
    
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    if ((this.token === '' || this.token === undefined) && this.user['tPassword'] && this.list_entities.length === 0) {
      const objUserSignIn = {
        'password': this.user['tPassword'],
        'user': this.user['tEmail'],
        'rememberMe': true,
      };
      this.service.authenticate(this.strategy, objUserSignIn).subscribe((resultAuth: NbAuthResult) => {
        if (resultAuth.isSuccess()) {
          // this.messages = resultAuth.getMessages();
          // this.token = this.messages[0]['body']['token'];
          // this.utilitiesService.fnSetToken(this.token);
          // this.userId = this.messages[0]['body']['userId'];
          // this.user_data = JSON.stringify(this.messages[0]['body']['usuario']);
          // this.utilitiesService.fnSetSessionStorage('user_id', this.userId);
          // this.utilitiesService.fnSetSessionStorage('user_data', this.user_data);
          // this.utilitiesService.fnSetSessionStorage('user_session', this.user['tEmail']);
          // this.user = this.messages[0]['body'];
          // this.utilitiesService.fnsetUser(this.user);

          // this.user_admin = this.messages[0]['body']['superAdmin'];
          // this.utilitiesService.fnSetSessionStorage('isSuperAdmin', this.user_admin);
          // const data_payload = this.utilitiesService.fnDecodePayload(this.token);

          this.redirect = resultAuth.getRedirect();
          this.utilitiesService.fnNavigateByUrl(this.redirect);
          // this.cd.detectChanges();
        } else {
          this.errors = resultAuth.getErrors();
          this.utilitiesService.showToast('bottom-right', 'danger', "El nombre de usuario o la contraseña son incorrectos.", 'nb-alert');
          this.submitted = false;
          // this.cd.detectChanges();
        }
        
      }, error => {
        // this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        this.submitted = false;
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.utilitiesService.showToast('top-right', 'danger', error, 'nb-alert');
        }).catch((error) => {
          this.utilitiesService.showToast('top-right', 'danger', error, 'nb-alert');
        })
        // this.cd.detectChanges();
      });
    } else {
      this.redirect = 'pages/dashboard';
      this.utilitiesService.fnNavigateByUrl(this.redirect);
      this.submitted = false;
      // this.cd.detectChanges();
    }
  }

}
