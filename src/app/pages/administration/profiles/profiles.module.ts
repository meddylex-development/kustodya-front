import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

const ENTRY_COMPONENTS = [
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ProfilesModule { }
