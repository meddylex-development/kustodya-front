import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepperComponent } from '@nebular/theme';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { FormControl, FormGroup, Validators } from '@angular/forms';
defineLocale('es', esLocale);

@Component({
  selector: 'ngx-agregar-empleador',
  templateUrl: './agregar-empleador.component.html',
  styleUrls: ['./agregar-empleador.component.scss']
})
export class AgregarEmpleadorComponent implements OnInit {

  @Input() data: any;
  @ViewChild('stepper') stepper: NbStepperComponent;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public state: any = {};
  public documentTypePatient: any = null;
  public collectionDocumentTypes:any = [];
  public documentTypeSelected: any = '';
  public employerDocumentNumber: any = '';
  public employerData: any = {
    'documentType': null,
    'employerDocumentNumber': '',
    'employerVerificationDigit': '',
    'employerName': '',
    'employerEconomicActivity': '',
    'patientContractStatus': true,
    'patientSalary': '',
  };
  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';
  public linearMode: boolean = true;
  public showBtnPrev: boolean = false;
  public showBtnNext: boolean = true;
  public showBtnSave: boolean = false;
  public selectedIndex: number = 1;

  public collectionEmployerEconomicActivity: any = [
    {  },
  ]

  public myGroup: any = new FormGroup({
    value: new FormControl('', Validators.required)
  });
  
  constructor(
    protected ref: NbDialogRef<AgregarEmpleadorComponent>,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
  ) { }

  ngOnInit(): void {
    // this.utilitiesService.fnAuthValidUser().then(response => {
      console.log('data: ', this.data);
      this.fnGetDocumentTypes(this.token);
    //   this.token = response['token'];
    //   this.userData = response['user'];
    // }).catch(error => {
    //   this.utilitiesService.fnSignOutUser().then(resp => {
    //     this.utilitiesService.fnNavigateByUrl('auth/login');
    //   })
    // });
  }

  fnGetDocumentTypes(token) {
    // this.errors = [];
    // this.search = true;
    this.incapacityService.fnHttpGetTiposIdentificacion(token).subscribe((result) => {
      // this.submitted = false;
      if (result.status == 200) {
        this.collectionDocumentTypes = result.body;//.slice(1, 100);
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.collectionDocumentTypes.unshift(new_item);
        // this.documentTypePatient = this.collectionDocumentTypes[0];
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
      }
      // this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error', 'nb-alert');
      // this.submitted = false;
    });
  }

  fnSelectDocumentType($event) {
    console.log('$event: ', $event);
    this.documentTypeSelected = $event;
  }

  fnAddDataEmployer() {
    let objEmployer = { 
      'nit': '900365863-0', 
      'tRazonSocial': 'ProyectaTSP S.A.S.', 
      'tDigitoVerificacion': '0',
      'tDireccion': 'Calle 106 # 54 - 73 Oficina 201',
      'tObjetoSocial': null,
      'tipoDocumento': {
        'iIdTipoIdentificacion': 10,
        'tTipoIdentificacion': "Nit Empresarial",
      },
      'actividadEconomica': {
        'ciiu': "K7220",
        'iId': 603,
        'tNombreActividad': "Consultores en programas de informática, elaboración y suministro de programas de informática",
      },
      'ciiu': 'K7220 - Consultores en programas de informática, elaboración y suministro de programas de informática', 
      'ocupacionPaciente': '2511 - INGENIERO DE SISTEMAS ANÁLISIS Y DISEÑO', 
      'fechaIngreso': '22 Oct 2016', 
      'estadoContrato': true, 
      'salario': 1200000, 
      'ibc': 640000, 
      'valorDiaIncapcidad': 45000 
    };

    console.log('objEmployer: ', objEmployer);

  }

  fnAddDataPatientJob() {

  }

  fnAddDataPatientValuesJob() {
    
  }

  fnSelectEconomicActivity($event) {
    console.log('$event: ', $event);
  }

  fnChangeNextStep() {
    // this.selectedIndex
    console.log('this.selectedIndex: ', this.selectedIndex);
    // this.showBtnPrev
    console.log('this.showBtnPrev: ', this.showBtnPrev);
    // this.showBtnNext
    console.log('this.showBtnNext: ', this.showBtnNext);
    // this.showBtnSave
    console.log('this.showBtnSave: ', this.showBtnSave);
    // this.stepper.next();
    switch (this.selectedIndex) {
      case 1:
        this.stepper.next();
        this.showBtnPrev = true;
        this.showBtnNext = true;
        this.showBtnSave = false
        this.selectedIndex = 2;
        break;
      case 2:
        this.stepper.next();
        this.showBtnPrev = true;
        this.showBtnNext = false;
        this.showBtnSave = true
        this.selectedIndex = 3;
        break;
    }
  }
  
  fnChangePrevStep() {
    // this.selectedIndex
    console.log('this.selectedIndex: ', this.selectedIndex);
    // this.showBtnPrev
    console.log('this.showBtnPrev: ', this.showBtnPrev);
    // this.showBtnNext
    console.log('this.showBtnNext: ', this.showBtnNext);
    // this.showBtnSave
    console.log('this.showBtnSave: ', this.showBtnSave);
    // this.stepper.next();
    switch (this.selectedIndex) {
      case 2:
        this.stepper.previous();
        this.showBtnPrev = false;
        this.showBtnNext = true;
        this.showBtnSave = false
        this.selectedIndex = 1;
        break;
      case 3:
        this.stepper.previous();
        this.showBtnPrev = true;
        this.showBtnNext = true;
        this.showBtnSave = false;
        this.selectedIndex = 2;
        break;
    }
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
