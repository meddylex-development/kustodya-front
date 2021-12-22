import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AyudaComponent } from '../ayuda/ayuda.component';
declare var $: any;

@Component({
  selector: 'ngx-datos-ocr',
  templateUrl: './datos-ocr.component.html',
  styleUrls: ['./datos-ocr.component.scss'],
  providers: [IncapacityService]
})
export class DatosOcrComponent implements OnInit {

  public documentTypePatient: any = null;
  public documentNumberPatient: any = '63324967';
  // public documentTypePatient: any = null;
  // public documentNumberPatient: any = '';
  public token: any;
  public patientData: any = null;
  public search: boolean = false;
  public loading: boolean = false;
  public showTitleSearch: boolean = false;
  public documentTypeSelected: any = '';
  public html: any = '';
  public totalItems: any = 1;
  public patientIncapacities: any = '';
  public dataOcr: any = '';

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      // $('.btn-show-search-form').click(); // Emulate click display right sidebar to hide
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('payload');
    if (token && user_id) {
      this.token = token;
      let data = this.utilitiesService.fnGetDataShare();
      console.log('data: ', data);
      console.log('this.token: ', this.token);

      this.incapacityService.fnHttpGetDataOCRTranscription().subscribe((respDataOCR) => {
        console.log('respDataOCR: ', respDataOCR);
        if (respDataOCR['status'] == 200) {
          this.dataOcr = respDataOCR['body']['response'];
          this.dataOcr.forEach(element => {
            let myArray = element['Texto'].split(":");
            console.log('myArray: ', myArray);
          });
        }
      });
      
    } else {
      // self.router.navigateByUrl('');
    }
  }

  fnReturnPage(): void {
    this.location.back();
  }

  

}
