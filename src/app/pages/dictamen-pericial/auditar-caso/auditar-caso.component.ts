import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';


@Component({
  selector: 'ngx-auditar-caso',
  templateUrl: './auditar-caso.component.html',
  styleUrls: ['./auditar-caso.component.scss']
})
export class AuditarCasoComponent implements OnInit {

  public submitted: boolean = false;
  public flipped: boolean = false;
  public token: any;
  public dataSession: any = {};
  public dataTranscription: any = {};
  public senderName: any = '';
  public senderEmail: any = '';
  public dateEmail: any;
  public subjectEmail: any;
  public attachmentsEmail: any;
  // public dataService: any;

  constructor(
    private authService: NbAuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private utilitiesService: UtilitiesService,
    public originQualificationService: OriginQualificationService,
  ) { }

  ngOnInit() {
    let data = this.utilitiesService.fnGetDataShare(true);
    if (data['dataDictamen']) {

      let dataDictamen = data['dataDictamen'];
      
      // let remitente = dataDictamen['remitente'];
      // let arr = remitente.split(' ');

      // let nombreRemitente = (arr[0].replace(/"/g,'')).replace(/'\'/g,'');
      // let apellidoRemitente = (arr[1].replace(/"/g,'')).replace(/'\'/g,'');
      this.senderName = dataDictamen['usersClaimant'][0]['firstName'] + ' ' + dataDictamen['usersClaimant'][0]['lastName']
      // this.senderName = nombreRemitente + ' ' + apellidoRemitente;

      this.senderEmail = dataDictamen['usersClaimant'][0]['email'];
      // this.senderEmail = arr[arr.length - 1];

      this.dateEmail = dataDictamen['dateCreated'];

      this.subjectEmail = dataDictamen['nameDictamen'];

      this.attachmentsEmail = dataDictamen['attachments'];
      // this.attachmentsEmail = dataDictamen['adjuntos'];

      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // here we receive a payload from the token and assigne it to our `dataSession` variable
          this.dataSession = token.getPayload();
          this.token = token["token"];
          // this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, '', '', '', false);
          // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
          this.activatedRoute.params.subscribe(params => {
            
            // let emailId = params['idEmail'];
            // if (emailId) {
            //   this.fnBuilGetOriginData(this.token, emailId);
            // } else {
            //   this.fnReturnPage();
            //   this.utilitiesService.showToast('bottom-right', 'danger', "Ocurrio un error!", 'nb-alert');
            // }

            // const guid_user_active = params['param'];
          });
        }
      });
    } else {
      this.fnReturnPage();
      this.utilitiesService.showToast('bottom-right', 'danger', "Ocurrio un error!", 'nb-alert');
    }
  }

  fnGetOriginQualificationData(token, emailId) {
    return new Promise ((resolve, reject) => {
      this.originQualificationService.fnHttpGetOriginQualificationData(token, emailId).subscribe(resp => {
        // if (resp.status == 200) {
          resolve(resp);
        // }
      }, err => {
        reject(false);
      });
    });
  }

  fnBuilGetOriginData(token, emailId) {
    this.fnGetOriginQualificationData(token, emailId).then((resp) => {
      if (resp) {
        // this.dataService = resp;
        let dataService = resp;
        this.dataTranscription = dataService['body'];
      } else {
        this.fnReturnPage();
        this.utilitiesService.showToast('bottom-right', 'danger', "Ocurrio un error!", 'nb-alert');
      }
    });
  }
  
  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
  }

}
