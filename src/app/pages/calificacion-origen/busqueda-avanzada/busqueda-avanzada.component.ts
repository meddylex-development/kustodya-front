import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';
defineLocale('es', esLocale);
declare var $: any;

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EnumerationsService } from '../../../shared/api/services/enumerations.service';

@Component({
  selector: 'ngx-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.scss']
})
export class BusquedaAvanzadaComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public state: any = {};
  public dataAdavanceSearch: any = {};
  public collectionStates: any = [];
  public dataSession: any = {};
  public colorTheme: string = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate: any = new Date();
  public locale: string = 'es';
  public dateRange: any = [];
  public startDate: string = '';
  public endDate: string = '';
  
  constructor(
    protected ref: NbDialogRef<BusquedaAvanzadaComponent>,
    private dialogService: NbDialogService,
    private bsLocaleService: BsLocaleService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private enumerationsService: EnumerationsService,
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        this.bsLocaleService.use('es');
        // here we receive a payload from the token and assigne it to our `dataSession` variable
        this.dataSession = token.getPayload();
        this.token = token["token"];
        console.log('this.dataSession: ', this.dataSession);
        console.log('this.token: ', this.token);
        this.dataAdavanceSearch['textSearch'] = this.data['textSearchInput']; 
        this.dataAdavanceSearch['state'] = this.data['statusAudit']; 
        this.dataAdavanceSearch['daterange'] = this.data['dateRange'];
        this.dataAdavanceSearch['statusInfo'] = this.data['statusInfo'];
        this.submitted = true;
        this.fnGetOriginQualificationListStates(this.token).then((resp) => {
          if(resp) {
            console.log('resp: ', resp);
            this.collectionStates = resp;
            console.log('this.collectionStates: ', this.collectionStates);
            this.submitted = false;
          } else {
            this.submitted = false;
            this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error! Intentelo de nuevo', 'nb-alert');
          }
        });
        // alert("Hola")
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
      }
    });
  }

  fnGetOriginQualificationListStates(token) {
    return new Promise((resolve, reject) => {
      this.enumerationsService.fnHttpGetOriginQualificationListStates(token).subscribe(response => {
        if (response.status == 200) {
          let collectionStates = JSON.parse(JSON.stringify(response.body));
          resolve(collectionStates);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });
  }

  fnSearch(dataAdavanceSearch) {
    console.log('dataAdavanceSearch: ', dataAdavanceSearch);
    this.dismiss(dataAdavanceSearch);
  }

  fnSetStatusEmailSearch($event) {
    console.log('$event: ', $event);
    this.dataAdavanceSearch['statusInfo'] = $event;
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelData() {
    // this.submitted = false;
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
