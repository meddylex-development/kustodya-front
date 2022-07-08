/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF, TitleCasePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
// importar locales
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-MX';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
// registerLocaleData(localeEsAR, 'es-Mx');

import { HttpClientModule, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NgxPaginationModule } from 'ngx-pagination'; //
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

/* ************+ Import module NbPasswordAuthStrategy strategy ************ */
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken, NbPasswordAuthStrategyOptions } from '@nebular/auth';
/* ************+ Import module NbPasswordAuthStrategy strategy ************ */
/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { AuthGuard } from './shared/api/services/auth-guard.service';
import { getDeepFromObject } from '@nebular/auth/helpers';

import { NbToastrModule } from '@nebular/theme';
import { NbTooltipModule } from '@nebular/theme';
import { NbDialogModule } from '@nebular/theme';
import { NbStepperModule } from '@nebular/theme';
import { NbCheckboxModule } from '@nebular/theme';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GridFilterPipe } from './shared/pipes/grid-filter.pipe';
import { AuthInterceptorService } from './shared/api/services/auth-interceptor.service';

import { environment } from '../environments/environment';

// JQuery Import
import * as $ from 'jquery';
// import { CapitalizePipe } from './shared/pipes/capitalize.pipe';

export interface NbAuthSocialLink {
  link?: string;
  url?: string;
  target?: string;
  title?: string;
  icon?: string;
}

const socialLinks: NbAuthSocialLink[] = [];

export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'user',  // strategy id key.
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'user',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'user',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'user',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'user',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      user: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
    error: true,
  },
};

export function setReturnDataMessages(module: string, res: HttpResponse<Object>): Object[] { return [res]; }
export function setReturnDataErrors(module: string, res: HttpErrorResponse): Object[] { return [res]; }


@NgModule({
  declarations: [AppComponent, GridFilterPipe, /* CapitalizePipe */],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NbToastrModule.forRoot(),
    NbTooltipModule,
    TooltipModule.forRoot(),
    NbDialogModule.forRoot(),
    NgSelectModule,
    NbCheckboxModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    Ng5SliderModule,
    NgbModule.forRoot(),
    // NgbTimepicker,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbStepperModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    /* ************+ START - Implement module NbPasswordAuthStrategy strategy ************ */
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'user',

          token: {
            class: NbAuthJWTToken,
            key: 'token', // this parameter tells where to look for the token
          },

          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/api/Account/Login',
            method: 'post',
            redirect: {
              success: 'pages/dashboard',
              failure: 'auth/login',
            },
          },
          register: {
            endpoint: '/api/Auth/SignUp',
            method: 'post',
            redirect: {
              success: 'auth/login',
              failure: null,
            },
          },
          // logout: {
          //   endpoint: '/api/Auth/SignOut',
          //   method: 'post',
          //   redirect: {
          //     success: 'auth/login',
          //     failure: 'auth/login',
          //   },
          // },
          logout: { 
            method: null, 
            redirect: { 
              success: '/', 
              failure: '/' 
            } 
          },
          requestPass: {
            endpoint: '/api/Auth/RememberPassword',
            method: 'post',
          },
          resetPass: {
            endpoint: '/api/Auth/ResetPassword',
            method: 'post',
          },

          messages: {
            key: 'codMessage', // this parameter tells where to look for the token
            getter: setReturnDataMessages,
          },

          errors: {
            key: 'codMessage',
            getter: setReturnDataErrors,
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    /* ************+* END - Implement module NbPasswordAuthStrategy strategy ************* */
  ],
  bootstrap: [AppComponent],
  exports: [GridFilterPipe],
  providers: [
    AuthGuard,
    TitleCasePipe,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
})
export class AppModule {
}
