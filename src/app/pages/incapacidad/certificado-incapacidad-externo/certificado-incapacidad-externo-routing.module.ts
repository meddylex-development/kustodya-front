import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';  // <---
import { CertificadoIncapacidadExternoComponent } from '../certificado-incapacidad-externo/certificado-incapacidad-externo.component'; // <---
export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    
    children: [
      {
        path: 'certificado',
        component: CertificadoIncapacidadExternoComponent, // <---
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificadoIncapacidadExternoRoutingModule {
}
