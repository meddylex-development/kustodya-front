import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-valores-incapacidad',
  templateUrl: './valores-incapacidad.component.html',
  styleUrls: ['./valores-incapacidad.component.scss']
})
export class ValoresIncapacidadComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null;
  public patientData: any = null;
  public patientDiagnostic: any = null;
  public patientEmployer: any = null;
  public submitted: boolean = false;
  public state: any = {};
  public objectDataUser: any = null;
  public objectDataUserOriginal: any = null;
  public doctorAssign: any = null;
  public dataDoctor: any = null;
  public priorityCase: number = 1;
  public btnInfo: number = 1;
  public loading: boolean = false;
  public textSpinner: string = "Cargando...";

  public inputValueIBCPatient: string = '';
  public valueDayJob: any = 0;
  public daysEPSToPay: any = 0;
  public EPSValuePay: any = 0;
  public daysAFPToPay: any = 0;
  public AFPValueToPay: any = 0;
  public daysEmployerToPay: any = 0;
  public employerValuePay: any = 0;
  public totalPatientDaysToPay: any = 0;
  public totalPatientValueToPay: any = 0;
  
  constructor(
    protected ref: NbDialogRef<ValoresIncapacidadComponent>,
    private utilitiesService: UtilitiesService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.utilitiesService.fnAuthValidUser().then(response => {
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      let data = this.utilitiesService.fnGetDataShare();
      this.token = response['token'];
      this.userData = response['user'];
      // this.data
      this.patientData = this.data['patientData'];
      this.patientDiagnostic = this.data['diagnostic'];
      this.patientEmployer = this.data['employer'];

      let patientDaysAccum = this.patientEmployer['patientDaysAccum'];
      let ibc = this.patientEmployer['ibc'];
      let index = this.data['index'];
      let patientDaysGranted = this.patientDiagnostic['patientDaysGranted'];
      // this.loading = true;
      // return false;
      this.fnCalcValueIncapacity(patientDaysAccum, ibc, index, patientDaysGranted, null);
      

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnCalcValueIncapacity(patientDaysAccum, dataIBC, index, patientDaysGranted, dataDiagnosticCorrelation) {

    if(patientDaysAccum != '' && patientDaysAccum != null && dataIBC != '' && dataIBC != null) {
      this.inputValueIBCPatient = dataIBC;
      // let diasAcumulados = dataDiagnosticCorrelation['iDiasAcumuladosPorroga'];
      let diasAcumulados = patientDaysAccum;
      // let prorroga = dataDiagnosticCorrelation['bProrroga'];
      let prorroga = this.patientData['diagnostic']['extensionIncapacity'];
  
      let daysAccumulated = parseInt(diasAcumulados);
      let totalDaysAccumulated = parseInt(patientDaysGranted) + parseInt(diasAcumulados);
      let totalDays = parseInt(patientDaysGranted);
      let valueDayJob = parseInt(this.inputValueIBCPatient) / 30;
      this.valueDayJob = valueDayJob;
      let daysEPSToPay = 0;
      let daysEPSToFirstPay = 0;
      let daysEPSToSecondPay = 0;
      let daysAFPToPay = 0;
      let AFPValueToPay = 0;
      let EPSValuePay = 0;
      let EPSValueFirstPay = 0;
      let EPSValueSecondPay = 0;
      let daysEmployerToPay = 0;
      let employerValuePay = 0;
      let totalPatientDaysToPay = 0;
      let totalPatientValueToPay = 0;
      let formulaFamisanar = (2*(1/3));
      let salarioMinimo = 1000000;
      let valorSalarioMinimoDia = salarioMinimo / 30;
  
      if(prorroga == false) {
  
        if(totalDays <= 30 && totalDays > 0) {
            // Si los dias son superiores a 2 entonces la incapacidad la paga la EPS
  
            daysEPSToPay = totalDays - 2;
            EPSValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
            this.daysEPSToPay = daysEPSToPay;
            this.EPSValuePay = EPSValuePay;
  
            this.daysAFPToPay = daysAFPToPay;
            this.AFPValueToPay = AFPValueToPay;
  
            daysEmployerToPay = totalDays - daysEPSToPay;
            employerValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) * daysEmployerToPay) : valorSalarioMinimoDia * daysEmployerToPay;
            this.daysEmployerToPay = daysEmployerToPay;
            this.employerValuePay = employerValuePay;
  
            totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay;
            totalPatientValueToPay = EPSValuePay + employerValuePay;
            this.totalPatientDaysToPay = totalPatientDaysToPay;
            this.totalPatientValueToPay = totalPatientValueToPay;
  
        }
  
      }
  
      if (prorroga == true) {
        
        
        if (daysAccumulated <= 90 && daysAccumulated > 0) {
            if (totalDaysAccumulated <= 90) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = daysEmployerToPay;
                this.employerValuePay = employerValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 90;
                let data2 = totalDays - data1;
  
                daysEPSToFirstPay = data2;
                EPSValueFirstPay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
  
                daysEPSToSecondPay = data1;
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
  
                daysEPSToPay = data1 + data2;
  
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = daysEmployerToPay;
                this.employerValuePay = employerValuePay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated <= 180 && daysAccumulated > 90) {
            if (totalDaysAccumulated <= 180 && totalDaysAccumulated > 90) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 180;
                let data2 = totalDays - data1;
  
                daysEPSToFirstPay = data2;
                EPSValueFirstPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
                
                daysEPSToSecondPay = 0;
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
                
                daysAFPToPay = data1;
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia * daysAFPToPay;
  
                // daysEPSToPay = data1 + data2;
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                // EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = 0 // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated <= 540 && daysAccumulated > 180) {
            if (totalDaysAccumulated <= 540 && totalDaysAccumulated > 180) {
                // Paga el Fondo de Pensiones
                daysAFPToPay = totalDays;
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia *  daysAFPToPay;
                // daysEPSToPay = daysEPSToPay;
                // EPSValuePay = EPSValuePay;
                daysEPSToPay = 0;
                EPSValuePay = 0;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = 0; // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 540;
                let data2 = totalDays - data1;
  
                daysEPSToFirstPay = 0;
                EPSValueFirstPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
  
                daysEPSToSecondPay = data1;
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
  
                daysAFPToPay = data2;
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia * daysAFPToPay;
  
                // daysEPSToPay = data1 + data2;
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                // daysAFPToPay = daysAFPToPay;
  
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                // EPSValuePay = EPSValueFirstPay;
                // AFPValueToPay = AFPValueToPay;
                
                // daysEPSToPay = 0;
                // EPSValuePay = 0;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = totalDays - (daysEPSToPay + daysAFPToPay);
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated > 540) {
            if (totalDaysAccumulated > 540) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = 0; // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
  
      } 
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
