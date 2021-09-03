import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { BaseComponent } from './base.component';
import { CardsOrderComponent } from './cards-order/cards-order.component';

@NgModule({
  imports: [ThemeModule],
  declarations: [
    BaseComponent,
    CardsOrderComponent,
  ],
})
export class BaseModule { }
