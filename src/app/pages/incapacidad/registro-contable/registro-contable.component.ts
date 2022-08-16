import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';

@Component({
  selector: 'ngx-registro-contable',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registro-contable.component.html',
  styleUrls: ['./registro-contable.component.scss']
})
export class RegistroContableComponent implements OnInit {

  public flipped: boolean = false;
  public submitted: boolean = false;
  public token: any;
  public patientData: any = null;
  public diagnosticCodeDNI: any;
  public dataDoctor: any;
  public dataDetailAccounting: any;

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private auditService: AuditService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['diagnosticCodeDNI']) {
        this.diagnosticCodeDNI = params['diagnosticCodeDNI'];
        // this.token = params.token;
        const token = sessionStorage.getItem("token");
        this.token = token;
        // this.fnGetDataDiagnosticByDNI(this.token, this.diagnosticCodeDNI)
        let data = this.utilitiesService.fnGetDataShare();
        this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
        
        if (data && this.dataDoctor) {
          const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
          const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
          const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
          // const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
          this.dataDoctor['especiality'] = dataDoctorEspeciality;
          this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
          // this.dataDoctor['signature'] = dataDoctorSignature;
          this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));

          this.patientData = data['patientData'];
          this.fnGetDetailAccountingRegistry(this.diagnosticCodeDNI).then((respDataDetail) => {
            // this.dataDetailAccounting = respDataDetail['body'];
            this.dataDetailAccounting = respDataDetail;
          });
        } else {
          this.patientData = null;
          this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
        }
      } else {
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }).catch((error) => {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        })
      }
    });
  }

  fnGetDetailAccountingRegistry(idIncapacity) {
    // this.submitted = true;
    return new Promise((resolve, reject) => {
      this.auditService.fnHttpGetDetalleMovimientoContable(idIncapacity).subscribe(respDetail => {
        let collectionAccountingRegistry = respDetail['body'];
        let dataRegitroRTCNoLiquidada = [];
        let dataRegitroRTCLiquidada = [];
        let dataRegitroRTCCancelacion = [];
        let dataRTCCancelacionNoLiquidada = [];

        let dataAccounting = [];

        collectionAccountingRegistry.forEach(element => {
          if (element['Descripcion'] == "Registro RTC no liquidada\r\n") {
            dataRegitroRTCNoLiquidada.push(element);
            // element['dataRegitroRTCNoLiquidada'] = dataRegitroRTCNoLiquidada;
            // dataAccounting.push(dataRegitroRTCNoLiquidada);
          }
          if (element['Descripcion'] == "Registro RTC liquidada\r\n") {
            dataRegitroRTCLiquidada.push(element);
            // element['dataRegitroRTCLiquidada'] = dataRegitroRTCLiquidada;
            // dataAccounting.push(dataRegitroRTCLiquidada);
          }
          if (element['Descripcion'] == "Cancelación RTC liquidada\r\n") {
            dataRegitroRTCCancelacion.push(element);
            // element['dataRegitroRTCCancelacion'] = dataRegitroRTCCancelacion;
            // dataAccounting.push(dataRegitroRTCCancelacion);
          }
          if (element['Descripcion'] == "Cancelación RTC no liquidada\r\n") {
            dataRTCCancelacionNoLiquidada.push(element);
            // element['dataRegitroRTCCancelacion'] = dataRegitroRTCCancelacion;
            // dataAccounting.push(dataRegitroRTCCancelacion);
          }
        });
        // dataAccounting = [
        //   dataRegitroRTCNoLiquidada,
        //   dataRegitroRTCLiquidada,
        //   dataRegitroRTCCancelacion,
        // ];
        if(dataRegitroRTCNoLiquidada.length > 0) {
          dataAccounting.push(dataRegitroRTCNoLiquidada);
        }
        if(dataRegitroRTCLiquidada.length > 0) {
          dataAccounting.push(dataRegitroRTCLiquidada);
        }
        if(dataRegitroRTCCancelacion.length > 0) {
          dataAccounting.push(dataRegitroRTCCancelacion);
        }
        if(dataRTCCancelacionNoLiquidada.length > 0) {
          dataAccounting.push(dataRTCCancelacionNoLiquidada);
        }
        // this.collectionAttentionTypes = JSON.parse(JSON.stringify(r.body));
        // this.submitted = false;
        resolve(dataAccounting);
      }, err => {
        reject(false);
        // this.utilitiesService.showToast('bottom-right', 'danger', err, 'nb-alert');
        // this.submitted = false;
      });
    });
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    // this.flipped = (this.flipped) ? false : true;
  }

}
