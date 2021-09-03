import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { NbLogoutComponent, NbAuthService, NbTokenService } from '@nebular/auth';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignOutService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    public http: HttpClient,
    // private utility: UtilitiesService,
    protected service: NbAuthService,
    protected nbTokenService: NbTokenService,
    protected router: Router) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  // logout(strategy: string):  Observable<any> {
  //   this.service.logout(strategy).subscribe((result) => {

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       setTimeout(() => {
  //         return this.router.navigateByUrl(redirect);
  //       }, this.redirectDelay);
  //     }
  //   });
  // }
}
