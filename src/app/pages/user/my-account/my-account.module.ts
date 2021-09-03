import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [ThemeModule, TooltipModule.forRoot()],
  declarations: [],
})
export class MyAccountModule { }
