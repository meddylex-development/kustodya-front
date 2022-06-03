import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { NbDialogService } from '@nebular/theme';

import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { PreviewRehabilitationConceptComponent } from '../preview-rehabilitation-concept/preview-rehabilitation-concept.component';

import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../../shared/api/services/incapacity.service';

@Component({
  selector: 'ngx-incapacity-rehabilitation-concept',
  templateUrl: './incapacity-rehabilitation-concept.component.html',
  styleUrls: ['./incapacity-rehabilitation-concept.component.scss']
})
export class IncapacityRehabilitationConceptComponent implements OnInit {

  search: boolean = true;

  paciente: any = null;
  fechaActual = new Date();
  tLegalInformation: string = '';
  age: string = '';
  days: any;
  months: any;
  years: any;
  sequelsDescription_mode: any = '';
  otherPorcess_mode: any = '';

  error_form: any = {
    'sequelsDescription_mode': { 'data': false, 'length': false },
    'otherPorcess_mode': { 'data': false, 'length': false },
    'documentType': { 'data': false, 'length': false },
    'documentNumber': { 'data': false, 'length': false },
  };
  submitted: boolean = false;
  errors: string[] = [];
  token: any;

  user: any = {};
  list_documentType: any = [{ id: 1, nombre: 'TI' }, { id: 2, nombre: 'CC' }];
  data: any;

  concept: any = {};
  collection_cie_10: any = [];
  list_etymology: any = [];
  list_sequels: any = [];
  list_forecast: any = [];
  list_purposeTreatment: any = [];
  list_StatesPatientPrognosis: any = [];
  list_Remission: any = [];
  showOtherPorcess: boolean = false;
  sequelsDescription_ClinicalHistoryCurrentStatus: string = "";

  constructor(private dialogService: NbDialogService,
    private incapacityService: IncapacityService,
    private utilitiesService: UtilitiesService,
    private dashboardComponent: DashboardComponent,
    private sanitizer: DomSanitizer, ) { }

  ngOnInit() {
    this.token = this.dashboardComponent.token;
    this.fnGetConcept();
    this.fnGetEtiologia();
    this.fnGetSequels();
    this.fnGetForecast();
    this.fnGetPurposeTreatment();
    this.fnGetRemission();
    this.fnGetTiposIdentificacion();
    this.fnGetCie10(1);
    this.user = JSON.parse(this.utilitiesService.fnGetUser());
    this.user.documentNumber = "63324967";
    this.user.tEspecialidad = this.user.usuario.ocupacion.tNombre;
    this.user.tRegistroMedico = this.user.usuario.ocupacion.numeroRegistroProfesional;
    this.user.tfirma = 'data:image/png;base64, ' + this.user.usuario.documento.imagen;
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

    this.tLegalInformation = 'Se emite Concepto de Rehabilitación  en cumplimiento de   lo    establecido    por    el    artículo    142 del    Decreto    Ley    0019 de    2012 y el Artículo 2.2.3.2.2 del Decreto 1333 de 2.018,    que    estipula    que    las    Entidades    Promotoras    de    Salud    deberán    emitir    el    concepto    de    rehabilitación    y    enviarlo    antes    de   cumplirse   el   día   ciento   veinte   (120)   a   la   Administradora   de    Fondo    de    Pensiones,    con    el    fin    de    que    la misma    defina    si    postergará    el    trámite    de    calificación    de    Invalidez    hasta    por    un     término     máximo     de     trescientos   sesenta   (360)   días   calendario   adicionales   a   los   primeros   ciento    ochenta    (180)    días    de    incapacidad    temporal    reconocida    por    la    Entidad    Promotora    de    Salud    otorgando    un    subsidio    equivalente    a    la    incapacidad      que   venía   disfrutando   el   trabajador   (para   los   casos   con   concepto   de   rehabilitación   favorable)    o    si    procederá    a   calificar   la   pérdida   de   capacidad   laboral   con   el   fin   de   definir   si   hay   lugar   a   pensión   por   invalidez.';

    const s = this.paciente.dtFechaNacimiento.slice(0, 10);//d.toJSON().slice(0, 10);
    this.getAge(s)
    this.age = this.years + ' años'; // + this.months + ' meses / ' + this.days + ' dias'
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.tfirma);
  }

  fnGetConcept() {
    this.concept.diagnostics = [
      {
        "diagnostic": {
          "iIdcie10": 1,
          "tCie10": "A000",
          "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo cholerae",
          "iDiasMaxConsulta": 5,
          "iDiasMaxAcumulados": 12,
          "tFullDescripcion": "A000 - Cólera debido a Vibrio cholerae 01, biotipo cholerae",
          "iIdtipoCie": 1
        },
        "tFecha": "2019-09-02",
        "etymology": {
          "tIdEtymology": "1",
          "tEtymology": "Autoinmune"
        }
      },
      {
        "diagnostic": {
          "iIdcie10": 2,
          "tCie10": "A001",
          "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo el Tor",
          "iDiasMaxConsulta": 5,
          "iDiasMaxAcumulados": 12,
          "tFullDescripcion": "A001 - Cólera debido a Vibrio cholerae 01, biotipo el Tor",
          "iIdtipoCie": 1
        },
        "tFecha": '2019-09-05',
        "etymology": {
          "tIdEtymology": "4",
          "tEtymology": "Degenerativa"
        }
      },
      {
        "diagnostic": {
          "iIdcie10": 3,
          "tCie10": "A009",
          "tDescripcion": "Cólera, no especificado",
          "iDiasMaxConsulta": 5,
          "iDiasMaxAcumulados": 12,
          "tFullDescripcion": "A009 - Cólera, no especificado",
          "iIdtipoCie": 1
        },
        "tFecha": '2019-09-10',
        "etymology": {
          "tIdEtymology": "3",
          "tEtymology": "Cardiovascular"
        }
      },
      {
        "diagnostic": {
          "iIdcie10": 4,
          "tCie10": "A010",
          "tDescripcion": "Fiebre tifoidea",
          "iDiasMaxConsulta": 15,
          "iDiasMaxAcumulados": 36,
          "tFullDescripcion": "A010 - Fiebre tifoidea",
          "iIdtipoCie": 1
        },
        "tFecha": '2019-09-25',
        "etymology": {
          "tIdEtymology": "2",
          "tEtymology": "Congénita"
        }
      },
      {
        "diagnostic": {
          "iIdcie10": 2,
          "tCie10": "A001",
          "tDescripcion": "Cólera debido a Vibrio cholerae 01, biotipo el Tor",
          "iDiasMaxConsulta": 5,
          "iDiasMaxAcumulados": 12,
          "tFullDescripcion": "A001 - Cólera debido a Vibrio cholerae 01, biotipo el Tor",
          "iIdtipoCie": 1
        },
        "tFecha": '2019-10-15',
        "etymology": {
          "tIdEtymology": "1",
          "tEtymology": "Autoinmune"
        }
      },];
    this.concept.sequelsDescription = [
      {
        "sequel": {
          "tIdTipoSecuela": 1,
          "tTipoSecuela": "Anatomica"
        },
        "tDescripcion": "Presenta Una alteración persistente de una lesión consecuencia de la enfermedad.",
        "forecast": {
          "tIdPronostico": 1,
          "tPronostico": "Bueno"
        },
      },
      // {
      //   "tTipoSecuela": "Funcional",
      //   "tDescripcion": "BBBBBBBBBBBBBBBBBBBBB",
      //   "forecast": {
      //     "tIdPronostico": 2,
      //     "tPronostico": "Regular"
      //   }
      // }
    ];
    this.concept.possibleTherapeutic = {
      "typesPossibleTherapeutic": [
        {
          "tIdTypesPossibleTherapeutic": "1",
          "tTypesPossibleTherapeutic": "Farmacológico",
          "tcheck": true
        },
        {
          "tIdTypesPossibleTherapeutic": "2",
          "tTypesPossibleTherapeutic": "Quirúrgico",
          "tcheck": true
        },
        {
          "tIdTypesPossibleTherapeutic": "3",
          "tTypesPossibleTherapeutic": "Terapia Fisica",
          "tcheck": true
        },
        {
          "tIdTypesPossibleTherapeutic": "4",
          "tTypesPossibleTherapeutic": "Terapia Ocupacional",
          "tcheck": true
        },
        {
          "tIdTypesPossibleTherapeutic": "5",
          "tTypesPossibleTherapeutic": "Fonoadudiologia",
          "tcheck": true
        },
        {
          "tIdTypesPossibleTherapeutic": "6",
          "tTypesPossibleTherapeutic": "Otros Tramites",
          "tcheck": false
        },
      ],
      "otherPorcess": "otros procesos",
      "purposeTreatment": {
        "tIdPurposeTreatment": "1",
        "tDescription": "Paliativo"
      }
    };

    this.showOtherPorcess = this.concept.possibleTherapeutic.typesPossibleTherapeutic.filter(t => t.tTypesPossibleTherapeutic == "Otros Tramites")[0].tcheck;
    this.sequelsDescription_ClinicalHistoryCurrentStatus = "";
    this.concept.sequelsDescription.forEach(element => {
      this.sequelsDescription_ClinicalHistoryCurrentStatus = this.sequelsDescription_ClinicalHistoryCurrentStatus + element.tDescripcion;
    });
    this.concept.patientPrognosis = {
      "tShortTerm": [
        {
          "tIdStatesPatientPrognosis": 1,
          "tStatesPatientPrognosis": "Bueno",
          "tCheck": false
        },
        {
          "tIdStatesPatientPrognosis": 2,
          "tStatesPatientPrognosis": "Regular",
          "tCheck": true
        },
        {
          "tIdStatesPatientPrognosis": 3,
          "tStatesPatientPrognosis": "Malo",
          "tCheck": false
        }
      ],
      "tMediumTerm": [
        {
          "tIdStatesPatientPrognosis": 1,
          "tStatesPatientPrognosis": "Bueno",
          "tCheck": false
        },
        {
          "tIdStatesPatientPrognosis": 2,
          "tStatesPatientPrognosis": "Regular",
          "tCheck": false
        },
        {
          "tIdStatesPatientPrognosis": 3,
          "tStatesPatientPrognosis": "Malo",
          "tCheck": true
        }
      ],
      "tRemission": [
        {
          "tIdRemission": 1,
          "tRemission": "Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico favorable. (La administradora de Fondo de Pensiones debe definir el tiempo por el cual postergará el trámite la evaluación por medicina laboral para calificar la pérdida de capacidad laboral, y a partir del día 181 otorgar un subsidio equivalente a la incapacidad que venía disfrutando el trabajador)",
          "tCheck": false
        },
        {
          "tIdRemission": 2,
          "tRemission": "Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico desfavorable. (La administradora de Fondo de Pensiones debe tramitar la evaluación por medicina laboral para calificar la pérdida de capacidad laboral y definir si hay lugar a pensión por invalidez, previo lleno de requisitos)",
          "tCheck": false
        },
        {
          "tIdRemission": 3,
          "tRemission": "El afiliado no tiene días de incapacidad temporal acumulados y tiene un pronóstico desfavorable (La administradora de Fondo de Pensiones debe tramitar la evaluación por medicina laboral para calificar la pérdida de capacidad laboral y definir si hay lugar a pensión por invalidez, previo lleno de requisitos)",
          "tCheck": false
        }
      ],
    }
  }

  fnGetRemission() {
    this.list_Remission = [
      {
        "tIdRemission": 1,
        "tRemission": "Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico favorable. (La administradora de Fondo de Pensiones debe definir el tiempo por el cual postergará el trámite la evaluación por medicina laboral para calificar la pérdida de capacidad laboral, y a partir del día 181 otorgar un subsidio equivalente a la incapacidad que venía disfrutando el trabajador)"
      },
      {
        "tIdRemission": 2,
        "tRemission": "Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico desfavorable. (La administradora de Fondo de Pensiones debe tramitar la evaluación por medicina laboral para calificar la pérdida de capacidad laboral y definir si hay lugar a pensión por invalidez, previo lleno de requisitos)"
      },
      {
        "tIdRemission": 3,
        "tRemission": "El afiliado no tiene días de incapacidad temporal acumulados y tiene un pronóstico desfavorable (La administradora de Fondo de Pensiones debe tramitar la evaluación por medicina laboral para calificar la pérdida de capacidad laboral y definir si hay lugar a pensión por invalidez, previo lleno de requisitos)"
      }
    ]
  }

  fnGetStatesPatientPrognosis() {
    this.list_StatesPatientPrognosis = [
      {
        "tIdStatesPatientPrognosis": "1",
        "tStatesPatientPrognosis": "Bueno"
      },
      {
        "tIdStatesPatientPrognosis": "2",
        "tStatesPatientPrognosis": "Malo"
      },
      {
        "tIdStatesPatientPrognosis": "3",
        "tStatesPatientPrognosis": "Regular"
      }
    ]
  }

  fnGetPurposeTreatment() {
    this.list_purposeTreatment = [
      {
        "tIdPurposeTreatment": "1",
        "tDescription": "Paliativo"
      },
      {
        "tIdPurposeTreatment": "2",
        "tDescription": "Curativo"
      }
    ];
  }

  fnChangeOtherPorcess(item) {
    if (item.tTypesPossibleTherapeutic == "Otros Tramites") {
      this.showOtherPorcess = item.tcheck;
    }
  }

  fnGetTiposIdentificacion() {
    this.errors = [];
    this.submitted = true;
    this.incapacityService.fnHttpGetTiposIdentificacion(this.token).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        this.list_documentType = result.body;//.slice(1, 100);
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.list_documentType.unshift(new_item);
        this.user.documenttype = this.list_documentType[0];
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
    });
  }

  fnGetCie10(type_cie10) {
    this.errors = [];
    this.submitted = true;
    this.incapacityService.fnHttpGetCie10(this.token, type_cie10).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        // this.list_Cie10 = result.body;
        // let new_item: any = { iIdcie10: -1, tFullDescripcion: '' };
        // this.list_Cie10.unshift(new_item);
        this.collection_cie_10[type_cie10 - 1] = result.body;
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
    });
  }

  fnGetEtiologia() {
    this.list_etymology = [
      {
        "tIdEtymology": "1",
        "tEtymology": "Autoinmune"
      },
      {
        "tIdEtymology": "2",
        "tEtymology": "Congénita"
      },
      {
        "tIdEtymology": "3",
        "tEtymology": "Cardiovascular"
      },
      {
        "tIdEtymology": "4",
        "tEtymology": "Degenerativa"
      },
    ]
  }

  fnGetSequels() {
    this.list_sequels = [
      {
        "tIdTipoSecuela": 1,
        "tTipoSecuela": "Anatomica"
      },
      {
        "tIdTipoSecuela": 2,
        "tTipoSecuela": "Funcional"
      }
    ];
  }

  fnGetForecast() {
    this.list_forecast = [
      {
        "tIdPronostico": 1,
        "tPronostico": "Bueno"
      }, {
        "tIdPronostico": 2,
        "tPronostico": "Regular"
      }, {
        "tIdPronostico": 3,
        "tPronostico": "Malo"
      }
    ];
  }

  fnSearchUser() {
    if (this.user != undefined &&
      this.user.documentNumber != undefined &&
      this.user.documentNumber != "" &&
      this.user.documenttype != undefined &&
      this.user.documenttype != "") {
      this.search = false;
    }
  }

  fnAddDiagnostic() {
    this.concept.diagnostics.push(
      {
        "diagnostic": {
          "iIdcie10": -1,
          "tCie10": "",
          "tDescripcion": "",
          "iDiasMaxConsulta": 0,
          "iDiasMaxAcumulados": 0,
          "tFullDescripcion": "",
          "iIdtipoCie": 1
        },
        "tFecha": "2019-09-02",
        "etymology": {
          "tIdEtymology": -1,
          "tEtymology": ""
        }
      });
  }

  fnRemoveDiagnostic(index) {
    this.concept.diagnostics.splice(index, 1);
  }

  fnAddSequel() {
    this.concept.sequelsDescription.push(
      {
        "sequel": {
          "tIdTipoSecuela": -1,
          "tTipoSecuela": "Seleccione secuela"
        },
        "tDescripcion": "",
        "tPronostico": "Bueno",
      });
  }

  fnRemoveSequel(index) {
    this.concept.sequelsDescription.splice(index, 1);
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

  fnValidField(field, data_field, field_data_length?) {
    switch (field) {
      case 'sequelsDescription_mode':

        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          if (data_field.length > field_data_length) {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = true;
          } else {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = false;
          }
        }
        break;
      case 'otherPorcess_mode':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          if (data_field.length > field_data_length) {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = true;
          } else {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = false;
          }
        }
        break;
      case 'documentNumber':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          // if (data_field.length > field_data_length ) {
          //   this.error_form[field]['data'] = false;
          //   this.error_form[field]['length'] = true;
          // } else {
          this.error_form[field]['data'] = false;
          this.error_form[field]['length'] = false;
          // }
        }
        break;
      case 'documentType':
        if (!data_field || data_field.iIdTipoIdentificacion == -1 || data_field.iIdTipoIdentificacion == '') {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          this.error_form[field]['data'] = false;
          this.error_form[field]['length'] = false;
        }
        break;
    }
  }

  fnGenerateRehabilitationConcept() {
    this.fnPreviewRehabilitationConcept();
  }

  /******** Star Preview Rehabilitation Concept *********/
  fnPreviewRehabilitationConcept() {
    let self = this;
    this.dialogService.open(PreviewRehabilitationConceptComponent,
      {
        context: {}
      }).onClose.subscribe((res) => {
      });
  }
  /******** End Preview Rehabilitation Concept *********/

}
