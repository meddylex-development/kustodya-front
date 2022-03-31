import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './user/my-account/my-account.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { EmailManagementComponent } from './email-management/email-management.component';
import { InformacionComponent } from './incapacidad/informacion/informacion.component';
import { HistoricoPacienteComponent } from './incapacidad/historico-paciente/historico-paciente.component';
import { CertificadoIncapacidadComponent } from './incapacidad/certificado-incapacidad/certificado-incapacidad.component';
import { GenerarIncapacidadComponent } from './incapacidad/generar-incapacidad/generar-incapacidad.component';
import { VistaPreviaCertificadoIncapacidadComponent } from './incapacidad/vista-previa-certificado-incapacidad/vista-previa-certificado-incapacidad.component';
import { AdministracionCorreosComponent } from './incapacidad/administracion-correos/administracion-correos.component';
import { DatosOcrComponent } from './incapacidad/datos-ocr/datos-ocr.component';
import { RegistroContableComponent } from './incapacidad/registro-contable/registro-contable.component';
import { ReporteIncapacidadesComponent } from './incapacidad/reporte-incapacidades/reporte-incapacidades.component';
import { ReporteResolucionComponent } from './reporte/reporte-resolucion/reporte-resolucion.component';
import { ListEmailComponent } from './calificacion-origen/list-email/list-email.component';
import { TranscriptionComponent } from './calificacion-origen/transcription/transcription.component';
import { CertificadoCrhbComponent } from './rehabilitation-concept/certificado-crhb/certificado-crhb.component';
import { ConceptoRehabilitacionComponent } from './concepto-rehabilitacion/concepto-rehabilitacion.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: 'base',
      //   component: BaseComponent,
      // },
      {
        path: 'base/:token/:entity/:cun',
        component: DashboardComponent,
      },
      {
        path: 'dashboard/:token/:entity/:cun/:findrethus/:enumdoctype/:docnumber',
        component: DashboardComponent,
      },
      {
        path: 'incapacidad',
        children: [
          {
            path: 'home',
            component: InformacionComponent,
          }, 
          {
            path: 'historico',
            component: HistoricoPacienteComponent,
          }, 
          {
            path: 'certificado/:diagnosticCodeDNI',
            component: CertificadoIncapacidadComponent,
          }, 
          {
            path: 'generar-certificado',
            component: GenerarIncapacidadComponent,
          }, 
          {
            path: 'vista-previa-certificado',
            component: VistaPreviaCertificadoIncapacidadComponent,
          }, 
          // {
          //   path: 'administracion-correos',
          //   component: AdministracionCorreosComponent,
          // }, 
          {
            path: 'data-ocr',
            component: DatosOcrComponent,
          }, 
          {
            path: 'registro-contable/:diagnosticCodeDNI',
            component: RegistroContableComponent,
          }, 
        ]
      },
      {
        path: 'administracion',
        children: [
          {
            path: 'correos-electronicos',
            component: AdministracionCorreosComponent,
          }, 
          {
            path: 'reporte-incapacidades',
            component: ReporteIncapacidadesComponent,
          }, 
        ],
      }, 
      {
        path: 'calificacion-origen',
        children: [
          {
            path: 'listado-correos',
            component: ListEmailComponent,
          }, 
          {
            path: 'transcripcion/:idEmail',
            component: TranscriptionComponent,
          }, 
        ],
      }, {
        path: 'concepto-de-rehabilitacion',
        children: [
          {
            path: 'listado-casos',
            component: ConceptoRehabilitacionComponent
          },
          // {
          //   path: 'listado-casos',
          //   component: CertificadoCrhbComponent
          // },
          {
            path: 'certificado-crhb/:idUser',
            component: CertificadoCrhbComponent
          },
        ]
      }, 
      {
        path: 'reporte',
        children: [
          {
            path: 'reporte-resolucion',
            component: ReporteResolucionComponent,
          }
        ],
      }, 
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: 'modal-overlays',
        loadChildren:
          './modal-overlays/modal-overlays.module#ModalOverlaysModule',
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
