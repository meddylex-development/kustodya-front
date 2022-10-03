import { Component, Input, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { ConceptoRehabilitacionService } from '../../shared/api/services/concepto-rehabilitacion.service';
import { IncapacityService } from '../../shared/api/services/incapacity.service';
import { UserService } from '../../shared/api/services/user.service';
import { UtilitiesService } from '../../shared/api/services/utilities.service';
import { BuildAddressComponent } from '../build-address/build-address.component';

@Component({
  selector: 'ngx-patient-employer-list',
  templateUrl: './patient-employer-list.component.html',
  styleUrls: ['./patient-employer-list.component.scss']
})
export class PatientEmployerListComponent implements OnInit {

  @Input() patientData: any;
  @Input() idPaciente: any;
  @Input() documentNumber: any;
  @Input() documentType: any;
  @Input() collectionEmployers: any;
  @Input() typeList: any; // 1. Listado para carta CRHB - 2. Informacion - 3.Generacion de incapacidad
  public token: any;
  public dataSession;
  public dataEmployers: any;
  public dataEmlployerPatient: any = null;

  constructor(
    private authService: NbAuthService,
    private userService: UserService, 
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token["token"];
        this.dataSession = token.getPayload();

    
        if (this.collectionEmployers) {
          this.dataEmlployerPatient = this.collectionEmployers;
        } else {
          
          this.fnGetListData(this.token, this.documentType, this.documentNumber);

    
        }

      }
    });

  }

  fnGetListData(token, documentType, documentNumber) {
    this.fnGetDataEmployerPatient(token, documentType, documentNumber).then((response) => {
      if (response) {
        let dataEmlployerPatient = response['body'];
        this.dataEmlployerPatient = (dataEmlployerPatient.length > 0) ? dataEmlployerPatient : [];  
      } else {
        this.dataEmlployerPatient =  [];
      }
    });
  }


  fnGetDataEmployerPatient(token, type_document, document_number) {
    return new Promise((resolve, reject) => {
      let objectData = {
        'NumeroDocumento': document_number,
        'TipoDoc': type_document,
      }
      this.incapacityService.fnHttpGetDataEmployerPatient(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    })
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    // dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    // this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
    // });
  }

  fnShowPreviewIncapacityCertificate(itemEmployer, i) {
    // this.patientData['employer'] = itemEmployer;
    // this.utilitiesService.fnSetDataShare({ 
    //   patientData: this.patientData, 
    //   patientIncapacities: this.patientIncapacities, 
    //   dataDiagnosticCorrelation: this.dataDiagnosticCorrelation,
    // });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/vista-previa-certificado');
  }

  fnShowValuesIncapacity(item, index) {
    item['ibc'] = "2500000";
    item['patientDaysAccum'] = "185";
    let dataSend = {};
    dataSend['data'] = { 
      index: index,
      module: '', 
      title: 'Valores incapacidad', 
      description: 'En el siguiente formulario puedes ver en detalle la responsabilidad de los pagos totales o parciales dependiendo de la proroga y los dias otorgados.' ,
      employer: item,
      // diagnostic: this.patientData['diagnostic'],
      // patientData: this.patientData,
    };
    dataSend['employer'] = item;
    // this.dialogService.open(ValoresIncapacidadComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
    // });
  }

  fnShowModalAddAddress(itemEmployer) {
    let dataSend = {};
    dataSend['data'] = itemEmployer;
    dataSend['typeList'] = this.typeList;
    dataSend['typeAddress'] = 2;
    this.dialogService.open(BuildAddressComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
      if (res) {
        let dataAddres = res;
        console.log('dataAddres: ', dataAddres);
        itemEmployer['dataAddress'] = dataAddres;
        itemEmployer['direccion'] = ((dataAddres['address'] + ', ' + dataAddres['aditionalDataAddress'] + ' - ' + dataAddres['userCity']['name'] + ', ' + dataAddres['userDepartament']['departamento'] + ', ' + dataAddres['userCountry']['name']).toUpperCase()).trim();
        itemEmployer['telefonoPrincipal'] = dataAddres['primaryPhone'];
        itemEmployer['telefonoSecundario'] = dataAddres['aditionalPhone'];
        this.fnGetListData(this.token, this.documentType, this.documentNumber);
        if (this.typeList == 1) {
          let objectData = {
            "tDireccion": "string",
            "iCodigoPostal": 0,
            "tTelefono": "string",
            "iIDCiudad": 0,
            "tEmail": "string",
            "iIDEmpresaPaciente": 0,
            "bNotificacionbyEmail": true,
            "bNotificacionbyPmail": true
          };
          console.log('objectData: ', objectData);
        }
      }
    });
  }

  fnUpdateEmployerCHRB(token, objectData) {
    // this.typeList
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpUpdateEmployerCHRB(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        // this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    });
  }

}
