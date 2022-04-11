import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';

@Component({
  selector: 'ngx-re-assign-case',
  templateUrl: './re-assign-case.component.html',
  styleUrls: ['./re-assign-case.component.scss']
})
export class ReAssignCaseComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null; 
  public patientData: any = null;
  public submitted: boolean = false;
  public state: any = {};
  public statusListIncapacity: any = [
    { 'id': 1, 'name': 'Emitida' },
    { 'id': 2, 'name': 'Transcrita' },
    { 'id': 3, 'name': 'Liberada' },
    { 'id': 4, 'name': 'Cobrada' },
    { 'id': 5, 'name': 'Rechazada' },
    { 'id': 6, 'name': 'Aprobada' },
    { 'id': 7, 'name': 'Pagada' },
  ];
  public statusListIncapacityOriginal: any = [
    { 'id': 1, 'name': 'Emitida' },
    { 'id': 2, 'name': 'Transcrita' },
    { 'id': 3, 'name': 'Liberada' },
    { 'id': 4, 'name': 'Cobrada' },
    { 'id': 5, 'name': 'Rechazada' },
    { 'id': 6, 'name': 'Aprobada' },
    { 'id': 7, 'name': 'Pagada' },
  ];
  public incapacityStatus: any = null;
  public dataAccountingBasicInfo: any = {};
  public idContabilidad: string = '';
  public dataDoctor: any = null;
  public changeStatus: boolean = false;
  
  constructor(
    protected ref: NbDialogRef<ReAssignCaseComponent>,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,
    private auditService: AuditService,
  ) { }

  ngOnInit(): void {
    // this.utilitiesService.fnAuthValidUser().then(response => {
      console.log('dataCase: ', this.dataCase);
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      console.log('this.dataDoctor: ', this.dataDoctor);
      let data = this.utilitiesService.fnGetDataShare();
      console.log('data: ', data);

      // if (data) {
      //   this.patientData = data['patientData'];
      // }

    //   this.token = response['token'];
    //   this.userData = response['user'];
    // }).catch(error => {
    //   this.utilitiesService.fnSignOutUser().then(resp => {
    //     this.utilitiesService.fnNavigateByUrl('auth/login');
    //   })
    // });
  }

  fnGenerateNewAccountingRegistry(dataCaseCreated, dataEmployer, token, idContabilidad, incapacityStatus) {

    // let datesDataCaseCreated = dataCaseCreated['dates'];
    // let objectDataSend = dataCaseCreated['objectDataSend'];
    let dataResponse = dataCaseCreated;

    let dateIncapacity = moment(this.dataCase['dtFechaEmisionIncapacidad']).format('YYYY/MM/DD');
    let monthDateIncapacity =  moment(this.dataCase['dtFechaEmisionIncapacidad']).format('MM');
    console.log('monthDateIncapacity: ', monthDateIncapacity);
    let dayDateIncapacity =  moment(this.dataCase['dtFechaEmisionIncapacidad']).format('DD');
    console.log('dayDateIncapacity: ', dayDateIncapacity);
    let yearDateIncapacity =  moment(this.dataCase['dtFechaEmisionIncapacidad']).format('YYYY');
    console.log('yearDateIncapacity: ', yearDateIncapacity);

    // this.submitted = true;
    return new Promise((resolve, reject) => {

      let object_send = {
        "EstadoId": incapacityStatus['id'],
        // "descripcionFicha": "Comprobante de emisión - Nueva incapacidad",
        "situacionEncontrada": `IEGA-${dataResponse['uiCodigoDiagnostico']}-NI-${dataEmployer['nit']}-CC-${this.patientData['tNumeroDocumento']}-${monthDateIncapacity}/${yearDateIncapacity}`,
        "usuarioCreacionId": this.dataDoctor['userId'],
        "contabilidadId": idContabilidad,
        // "claseDocumentoId": "5313F263-F8A0-4801-7CC9-08D8274C56E5",
        "entidadId": 1,
        "nroIncapacidad": dataResponse['uiCodigoDiagnostico'],
        "nitEmpleador": dataEmployer['nit'],
        "valor": Math.round(this.dataCase['valor']),
      };
      console.log('object_send: ', object_send);
      this.auditService.fnHttpPostCrearMovimientoContable(token, dataResponse['uiCodigoDiagnostico'], object_send).subscribe( r => {
        console.log('r: ', r);
        resolve(true);
        // if (r.status == 201) {
        //   resolve(true);
        //   this.utilitiesService.showToast('top-right', 'success', 'Se ha creado la depuracion con exito');
        //   // this.submitted = false;
        // }
      }, err => {
        reject(false);
      });
    });
  }

  fnGetContabilidad(token, value) {
    // this.loading_state = true;
    this.parameterizationService.fnHttpGetAccountingDetail(token, value).subscribe(r => {
      if (r.status == 200) {
        this.dataAccountingBasicInfo['claseDocumento'] = r.body['claseDocumentoPorDefecto'];
        this.dataAccountingBasicInfo['descripcionFicha'] = r.body['descripcionMovimientoPorDefecto'];
        this.dataAccountingBasicInfo['subcuenta'] = r.body['codigo'] + " - " + r.body['descripcion'];
        this.idContabilidad = r.body['id'];
      }
    }, err => {
      // this.collection_accounting = [];
    });

  }

  fnChangeStatus(incapacityStatus, dataCase, idContabilidad) {
    console.log('incapacityStatus: ', incapacityStatus);

    let dataEmployer = { 
      'nit': '900365863', 
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
      'ibc': 1200000, 
      'valorDiaIncapcidad': 45000 
    };

    this.fnGenerateNewAccountingRegistry(dataCase, dataEmployer, '', idContabilidad, incapacityStatus).then((resp) => {
      console.log('resp: ', resp);
      if (resp) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha cambiado de estado la incapacidad con exito');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error al cambiar de estado la incapacidad. Intentelo nuevamente!', 'nb-alert');
        this.dismiss(false);
      }

    }).catch((err) => {
      console.log('err: ', err);
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error al cambiar de estado la incapacidad. Intentelo nuevamente!', 'nb-alert');
      this.dismiss(false);
    });
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

  fnSelectStatusIncapacity(data) {
    console.log('data: ', data);
  }

}
