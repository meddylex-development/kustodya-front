import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  urlGetDataAllMenusByProject: string = '';
  urlLocalHost: string = 'http://localhost:4200';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnHttpGetListMenuByDefault(){
    return this.http.get(this.urlLocalHost + '/assets/data/items_menu_mock.json',
      {
        observe: 'response',
        reportProgress: true,
      });
  }
  fnHttpGetListMenuByPerfilHeredado(){
    return this.http.get(this.urlLocalHost,
      {
        observe: 'response',
        reportProgress: true,
      });
    
  }
  fnHttpGetListItemsByTypeProfile(){

    return this.http.get(this.urlLocalHost +'/assets/data/items_type_profile_mock.json',
      {
        observe: 'response',
        reportProgress: true,
      });
    
  }
}
