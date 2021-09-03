import { Component, OnInit, Input } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

import { DomSanitizer } from '@angular/platform-browser';

import { UtilitiesService } from '../../../../shared/api/services/utilities.service';

declare var $: any;

@Component({
  selector: 'ngx-preview-rehabilitation-concept',
  templateUrl: './preview-rehabilitation-concept.component.html',
  styleUrls: ['./preview-rehabilitation-concept.component.scss']
})
export class PreviewRehabilitationConceptComponent implements OnInit {

  @Input() diagnostigoGenerado: any;
  @Input() showIncapacidad: boolean = false;

  paciente: any = null;
  user: any = null;
  concept: any = {};

  fechaActual = new Date();
  tLegalInformation: string = '';

  age: string = '';
  days: any;
  months: any;
  years: any;

  constructor(protected ref: NbDialogRef<PreviewRehabilitationConceptComponent>,
    private sanitizer: DomSanitizer,
    private utilitiesService: UtilitiesService, ) { }

  ngOnInit() {
    this.fnGetConcept();

    this.tLegalInformation = 'Se emite Concepto de Rehabilitación  en cumplimiento de   lo    establecido    por    el    artículo    142 del    Decreto    Ley    0019 de    2012 y el Artículo 2.2.3.2.2 del Decreto 1333 de 2.018,    que    estipula    que    las    Entidades    Promotoras    de    Salud    deberán    emitir    el    concepto    de    rehabilitación    y    enviarlo    antes    de   cumplirse   el   día   ciento   veinte   (120)   a   la   Administradora   de    Fondo    de    Pensiones,    con    el    fin    de    que    la misma    defina    si    postergará    el    trámite    de    calificación    de    Invalidez    hasta    por    un     término     máximo     de     trescientos   sesenta   (360)   días   calendario   adicionales   a   los   primeros   ciento    ochenta    (180)    días    de    incapacidad    temporal    reconocida    por    la    Entidad    Promotora    de    Salud    otorgando    un    subsidio    equivalente    a    la    incapacidad      que   venía   disfrutando   el   trabajador   (para   los   casos   con   concepto   de   rehabilitación   favorable)    o    si    procederá    a   calificar   la   pérdida   de   capacidad   laboral   con   el   fin   de   definir   si   hay   lugar   a   pensión   por   invalidez.';

    this.user = JSON.parse(this.utilitiesService.fnGetUser());
    this.user.tEspecialidad = this.user.usuario.ocupacion.tNombre;
    this.user.tRegistroMedico = this.user.usuario.ocupacion.numeroRegistroProfesional;
    this.user.tfirma = 'data:image/png;base64, ' + this.user.usuario.documento.imagen;

    const s = this.paciente.dtFechaNacimiento.slice(0, 10);//d.toJSON().slice(0, 10);
    this.getAge(s)
    this.age = this.years + ' años'; // + this.months + ' meses / ' + this.days + ' dias'
  }

  fnGetConcept() {
    this.paciente =
      {
        "iIdpaciente": 2,
        "arl": {
          "tNombre": "Sura",
        },
        "afp": {
          "tNombre": "Porvenir",
        },
        "eps": {
          "iIdeps": 2,
          "tNombre": "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA",
          "tCodigoExterno": "EAS027",
          "tNumeroIdentificacion": "800112806",
          "tDigitoVerificacion": "2",
          "tPathLogo": "",
          "tNombreTipoSociedad": null
        },
        "tipoDocumento": {
          "iIdTipoIdentificacion": 9,
          "tTipoIdentificacion": "Cédula de ciudadanía"
        },
        "regimenAfiliacion": {
          "iId": 2,
          "tNombre": "Subsidiado"
        },
        "tipoAfiliacion": {
          "iid": 1,
          "tNombre": "Cotizante"
        },
        "ubicacion": {
          "iIdDane": 1,
          "tCodigoDANE": "05001000",
          "iIdPais": 57,
          "tNombrePais": "COLOMBIA",
          "iIdDepartamento": 5,
          "tNombreDepartamento": "ANTIOQUIA",
          "iIdMunicipio": 5001,
          "tNombreMunicipio": "MEDELLIN",
          "tNombrePoblacion": "MEDELLIN"
        },
        "empresa": {
          "iId": 1,
          "nit": 900365863,
          "tDigitoVerificacion": 0,
          "tRazonSocial": "ProyectaTSP S.A.S.",
          "tDireccion": "Calle 106 # 54 - 73 Oficina 201",
          "tObjetoSocial": null,
          "actividadEconomica": {
            "iId": 0,
            "tNombreActividad": null,
            "ciiu": null
          },
          "tipoSociedad": {
            "iId": 0,
            "tNombre": null
          }
        },
        "ocupacion": {
          "iId": 0,
          "tNombre": null,
          "numeroRegistroProfesional": null
        },
        "genero": {
          "iIdGenero": 14,
          "tGenero": "Femenino"
        },
        "tipoPlan": null,
        "tNumeroDocumento": "63324967",
        "tPrimerNombre": "MARTHA",
        "tSegundoNombre": "LUNA",
        "tPrimerApellido": "PIMIENTO",
        "tSegundoApellido": "",
        "tDireccion": "CL 94 11 A 65 APTO 703 BRR CHICO",
        "tTelefono": "6218692",
        "tEmail": "marthalunapimiento@gmail.com",
        "tTipoAfiliacion": null,
        "iEdad": 53,
        "dtFechaNacimiento": "1966-02-11T00:00:00"
      }
    this.concept.tConcepto = true;
    this.concept.tOrigen = 'Comun';
    this.concept.tRemission = 'Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico favorable. (La administradora de Fondo de Pensiones debe definir el tiempo por el cual postergará el trámite la evaluación por medicina laboral para calificar la pérdida de capacidad laboral, y a partir del día 181 otorgar un subsidio equivalente a la incapacidad que venía disfrutando el trabajador)'
    this.concept.tOrigenPatologia = 'Laboral';
    this.concept.tClinicalHistorySummary = 'Presenta Una alteración persistente de una lesión consecuencia de la enfermedad.';
    this.concept.diagnostic = [
      {
        "iIdcie10": 1,
        "tCie10": "A000",
        "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo cholerae",
        "iDiasMaxConsulta": 5,
        "iDiasMaxAcumulados": 12,
        "tFullDescripcion": "A000 - Cólera debido a Vibrio cholerae 01, biotipo cholerae",
        "iIdtipoCie": 1,
        "tFecha": "2019-09-02",
        "tEtimologia": "Autoinmune"
      },
      {
        "iIdcie10": 2,
        "tCie10": "A001",
        "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo el Tor",
        "iDiasMaxConsulta": 5,
        "iDiasMaxAcumulados": 12,
        "tFullDescripcion": "A001 - Cólera debido a Vibrio cholerae 01, biotipo el Tor",
        "iIdtipoCie": 1,
        "tFecha": '2019-09-05',
        "tEtimologia": "Degenerativa"
      },
      {
        "iIdcie10": 3,
        "tCie10": "A009",
        "tDescripcion": "Cólera, no especificado",
        "iDiasMaxConsulta": 5,
        "iDiasMaxAcumulados": 12,
        "tFullDescripcion": "A009 - Cólera, no especificado",
        "iIdtipoCie": 1,
        "tFecha": '2019-09-10',
        "tEtimologia": "Mental"
      },
      {
        "iIdcie10": 4,
        "tCie10": "A010",
        "tDescripcion": "Fiebre tifoidea",
        "iDiasMaxConsulta": 15,
        "iDiasMaxAcumulados": 36,
        "tFullDescripcion": "A010 - Fiebre tifoidea",
        "iIdtipoCie": 1,
        "tFecha": '2019-09-25',
        "tEtimologia": "Degenerativa"
      },
      {
        "iIdcie10": 2,
        "tCie10": "A001",
        "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo el Tor",
        "iDiasMaxConsulta": 5,
        "iDiasMaxAcumulados": 12,
        "tFullDescripcion": "A001 - Cólera debido a Vibrio cholerae 01, biotipo el Tor",
        "iIdtipoCie": 1,
        "tFecha": '2019-10-15',
        "tEtimologia": "Autoinmune"
      },];
    this.concept.sequelsDescription = [
      {
        "tTipoSecuela": "Anatomica",
        "tDescripcion": "Presenta Una alteración persistente de una lesión consecuencia de la enfermedad.",
        "tPronostico": "Bueno",
      },
      // {
      //   "tTipoSecuela": "Funcional",
      //   "tDescripcion": "BBBBBBBBBBBBBBBBBBBBB",
      //   "tPronostico": "Regular",
      // }
    ];
    this.concept.possibleTherapeutic = {
      "treatmentType": [
        {
          "tIdTreatmentType": "1",
          "tDescription": "Farmacológico"
        },
        {
          "tIdTreatmentType": "2",
          "tDescription": "Quirúrgico"
        },
        {
          "tIdTreatmentType": "3",
          "tDescription": "Terapia física"
        },
        {
          "tIdTreatmentType": "4",
          "tDescription": "Terapia ocupacional"
        },
        {
          "tIdTreatmentType": "5",
          "tDescription": "Fonoaudiología"
        },
      ],
      "tOtherTreatment": "Otros otros otros",
      "purposeTreatment": [
        {
          "tIdPurposeTreatment": "1",
          "tDescription": "Paliativo"
        },
        // {
        //   "tIdPurposeTreatment": "2",
        //   "tDescription": "Curativo"
        // }
      ]
    };
    this.concept.patientPrognosis = {
      "tShortTerm": "Bueno",
      "tMediumTerm": "Malo",
    }
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.tfirma);
  }

  dismiss() {
    this.ref.close();
  }

  getAge(dateString) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dob = new Date(dateString);
    dob.setHours(0, 0, 0, 0);
    this.fnDateInterval(dob, today);
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
}
