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
  // public dataService: any;

  constructor(
    private authService: NbAuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private utilitiesService: UtilitiesService,
    public originQualificationService: OriginQualificationService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      // console.log('token: ', token);
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `dataSession` variable
        this.dataSession = token.getPayload();
        this.token = token["token"];
        // console.log('this.dataSession: ', this.dataSession);
        console.log('this.token: ', this.token);
        // this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, '', '', '', false);
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
        this.activatedRoute.params.subscribe(params => {
          // console.log('params: ', params);
          let emailId = params['idEmail'];
          if (emailId) {
            console.log('emailId: ', emailId);
            this.fnBuilGetOriginData(this.token, emailId);
          } else {
            this.fnReturnPage();
            this.utilitiesService.showToast('bottom-right', 'danger', "Ocurrio un error!", 'nb-alert');
          }
          // const guid_user_active = params['param'];
        });
      }
    });
  }

  fnGetOriginQualificationData(token, emailId) {
    return new Promise ((resolve, reject) => {
      this.originQualificationService.fnHttpGetOriginQualificationData(token, emailId).subscribe(resp => {
        // console.log('resp: ', resp);
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
        // console.log('resp: ', resp);
        // this.dataService = resp;
        let dataService = resp;
        this.dataTranscription = dataService['body'];
        console.log('this.dataTranscription: ', this.dataTranscription);
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
