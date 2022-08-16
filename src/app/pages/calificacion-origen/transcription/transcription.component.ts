import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';


@Component({
  selector: 'ngx-transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent implements OnInit {

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
    if (data['emailData']) {

      let dataEmail = data['emailData'];
      let remitente = dataEmail['remitente'];
      let arr = remitente.split(' ');

      let nombreRemitente = (arr[0].replace(/"/g,'')).replace(/'\'/g,'');
      let apellidoRemitente = (arr[1].replace(/"/g,'')).replace(/'\'/g,'');

      this.senderName = nombreRemitente + ' ' + apellidoRemitente;

      this.senderEmail = arr[arr.length - 1];

      this.dateEmail = dataEmail['fechaCorreo'];

      this.subjectEmail = dataEmail['asunto'];

      this.attachmentsEmail = dataEmail['adjuntos'];

      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // here we receive a payload from the token and assigne it to our `dataSession` variable
          this.dataSession = token.getPayload();
          this.token = token["token"];
          // this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, '', '', '', false);
          // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
          this.activatedRoute.params.subscribe(params => {
            let emailId = params['idEmail'];
            if (emailId) {
              this.fnBuilGetOriginData(this.token, emailId);
            } else {
              this.fnReturnPage();
              this.utilitiesService.showToast('bottom-right', 'danger', "Ocurrio un error!", 'nb-alert');
            }
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
