import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingPerceivedService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllPerceivedValueQualifications: any = '';
  urlSetSaveNewPerceivedValueQualification: any = '';

  urlSetDataNewCategory: any = '';
  urlSetEditDataRatingPerceived: any = '';
  urlSetDeleteRatingValuePerceivedById: any = '';
  urlSetDeleteAllRatingsValuePerceived: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllPerceivedValueQualifications(guid_user, id_category, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllPerceivedValueQualifications = '/api/PerceivedValueQualifications/GetPerceivedValueQualifications?iIDCategory=' + id_category;
    return this.http.post(this.utility.fnGetHost() + this.urlGetDataAllPerceivedValueQualifications, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveNewPerceivedValueQualification(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetSaveNewPerceivedValueQualification = '/api/PerceivedValueQualifications/PostPerceivedValueQualifications';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveNewPerceivedValueQualification, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataRatingPerceived(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataRatingPerceived = '/api/PerceivedValueQualifications/PutPerceivedValueQualifications';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataRatingPerceived, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteRatingValuePerceivedById(guid_user, id_perceived_value_qualification): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteRatingValuePerceivedById = '/api/PerceivedValueQualifications/DeletePerceivedValueQualifications?iIDPerceivedValueQualification	=' + id_perceived_value_qualification;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteRatingValuePerceivedById,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteAllRatingsValuePerceived(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteAllRatingsValuePerceived = '/api/PerceivedValueQualifications/DeleteAllPerceivedValueQualifications?iIDVersion=' + id_version;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllRatingsValuePerceived,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
