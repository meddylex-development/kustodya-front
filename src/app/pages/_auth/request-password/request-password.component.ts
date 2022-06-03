import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AccountService } from '../../../shared/api/services/account.service';
import { NbLoginComponent, NbAuthJWTToken, NbAuthResult, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class NgxRequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  required: Boolean = true;
  minlength: Number = 8;
  maxlength: Number = 50;
  aria_invalid: Boolean = true;
  message_error_api: string = null;

  redirectDelay: number = 6000;
  // showMessages: any = {};
  // strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  message_success: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private accountService: AccountService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {
    this.user.tlanguage = 'en';
  }

  requestPass(): void {
    this.submitted = true;
    this.accountService.fnForgotPasswordRequest('"' + this.user.tEmail + '"').subscribe(result => {
      if (result.status == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'El email fue enviado!');
      }
      this.submitted = false;
    }, error => {
      let message = error.status == 404 ? 'Correo no existe' : error.message;
      this.utilitiesService.showToast('bottom-right', 'danger', message, 'nb-alert');
      this.submitted = false;
    });

  }
}
