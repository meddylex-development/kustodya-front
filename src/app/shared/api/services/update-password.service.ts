import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  urlSetUpdatePasswordUser: String = '';
  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnHttpSetUpdatePasswordUser(newPasswordHash): Observable<any> {
    this.urlSetUpdatePasswordUser = '/api/Account/ChangePassword?newPasswordHash=' + newPasswordHash;
    return this.http.post(this.utility.fnGetHost() + this.urlSetUpdatePasswordUser,
      {
        observe: 'response',
      });
  }
}
