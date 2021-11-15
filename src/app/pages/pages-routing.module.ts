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
        path: 'incapadades',
        children: [
          {
            path: 'home',
            component: InformacionComponent,
          }, 
          {
            path: 'historico',
            component: HistoricoPacienteComponent,
          }, 
        ]
      },
      {
        path: 'email-management',
        component: EmailManagementComponent,
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
