import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

declare var grecaptcha: any;
@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent implements OnInit {
  siteKeyCaptcha: string = '6LefepcUAAAAAEhBKcNZje758JXbCyzvlowD7hHl';
  // siteKeyCaptcha: string = '6LdT0JgUAAAAAPvuxbHZL5PXMAf5HMyRzXugUxVl';
  // siteKeyCaptcha: string = '6LefepcUAAAAACk_aFG24Wtg6mUPPWC7baG3va8Q';
  terms_and_conditions: Boolean = true;
  captcha_valid: Boolean = null;
  ngOnInit() {
    this.user.tlanguage = 'en';
    grecaptcha.render('capcha_element', {
      'sitekey': this.siteKeyCaptcha,
    });
    window['getResponceCapcha'] = this.getResponceCapcha.bind(this);
  }

  getResponceCapcha(captchaResponse: string) {
    this.verifyCaptcha(captchaResponse);
  }

  verifyCaptcha(captchaResponse: string) {
    if (captchaResponse) {
      this.captcha_valid = true;
    } else {
      this.captcha_valid = false;
      return false;
    }
  }

  fnValidateRequiredName(tFirstName, touched) {
    if (tFirstName === undefined && touched) {
      return true;
    }
  }

  fnValidateLengthName(lengthFirstName) {
    if (lengthFirstName > 0) {
      if (lengthFirstName < 3 || lengthFirstName > 50) {
        return true;
      } else {
        return false;
      }
    }
  }
}
