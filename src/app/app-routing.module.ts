import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { AuthGuard } from './shared/api/services/auth-guard.service';

export const routes: Routes = [
  // { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  // { path: 'activate-account', loadChildren: 'app/pages/pages.module#ActivateAccountModule' },
  {
    path: 'pages',
    // canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: 'app/pages/pages.module#PagesModule',
  },
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#NgxAuthModule',
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
