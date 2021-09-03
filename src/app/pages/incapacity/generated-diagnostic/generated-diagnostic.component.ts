import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

//This is required
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'ngx-generated-diagnostic',
  templateUrl: './generated-diagnostic.component.html',
  styleUrls: ['./generated-diagnostic.component.scss']
})
export class GeneratedDiagnosticComponent implements OnInit {

  @Input() diagnostigoGenerado: any;
  @Input() showIncapacidad: boolean = false;

  constructor(protected ref: NbDialogRef<GeneratedDiagnosticComponent>,
    private utilitiesService: UtilitiesService,
    private sanitizer: DomSanitizer) { }

  sintomas: any = [];
  signos: any = [];
  diagnostico: string = '';

  eps: any = {};
  ips: any = {};
  ips_user: any = null;
  age: string = '';
  days: any;
  months: any;
  years: any;

  user: any = {};
  user_data: any = null;

  ngOnInit() {
    this.diagnostico = this.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 1)[0].tFullDescripcion;
    this.sintomas = this.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 2);
    this.signos = this.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 3);
    this.user_data = JSON.parse(sessionStorage.getItem('user_data'));
    this.ips_user = JSON.parse(sessionStorage.getItem('ips'));

    // this.diagnostigoGenerado.tLugarExpedicion = "Cundinamarca - Bogota D.C";
    // this.diagnostigoGenerado.tshortIncapacityNumber = "101603-17";
    // this.diagnostigoGenerado.paciente.tRegimenAfiliacion = "Cotizante";
    // this.diagnostigoGenerado.paciente.tdireccionRecidencia = "Cll 152  # 111 - 33";
    // this.diagnostigoGenerado.paciente.tdepartamento = "Cundinamarca";
    // this.diagnostigoGenerado.paciente.tmunicipio = "Bogota D.C";
    // this.diagnostigoGenerado.paciente.tCargo = "Desarrollador";
    // this.diagnostigoGenerado.paciente.empresa = {};
    // this.diagnostigoGenerado.paciente.empresa.tNombre = "Roojo-tech";
    // this.diagnostigoGenerado.paciente.empresa.tActividadEconomica = "Desarrollo Tecnologico";

    // this.ips = this.utilitiesService.getIPS();
    this.eps = this.diagnostigoGenerado.eps;
    this.ips = this.diagnostigoGenerado.ips;
    this.user = JSON.parse(this.utilitiesService.fnGetUser());
    this.user.tEspecialidad = this.user.usuario.ocupacion.tNombre;
    this.user.tRegistroMedico = this.user.usuario.ocupacion.numeroRegistroProfesional;
    const signature_doctor = (this.user.usuario.documento.imagen) ? 'data:image/png;base64, ' + this.user.usuario.documento.imagen : null;
    this.user.tfirma = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;

    const s = this.diagnostigoGenerado.paciente.dtFechaNacimiento.slice(0, 10);//d.toJSON().slice(0, 10);
    this.getAge(s)
    this.age = this.years + ' años / ' + this.months + ' meses / ' + this.days + ' dias'
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.tfirma);
  }

  dismiss() {
    this.ref.close();
  }

  fnShowIncapacidad() {
    this.showIncapacidad = true;
  }

  fnDateInterval(start, end) {
    if (start > end) [start, end] = [end, start];
    this.days = end.getDate() - start.getDate();
    this.months = end.getMonth() - start.getMonth();
    this.years = end.getFullYear() - start.getFullYear();
    if (this.days < 0) {
      this.days += (new Date(start.getFullYear(), start.getMonth() + 1, 0)).getDate();
      this.months--;
    }
    if (this.months < 0) {
      this.months += 12;
      this.years--;
    }
  }

  getAge(dateString) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dob = new Date(dateString);
    dob.setHours(0, 0, 0, 0);
    this.fnDateInterval(dob, today);
  }
}
