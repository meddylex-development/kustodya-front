import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';
import { AddEmailManagementComponent } from './add-email-management/add-email-management.component';
import { EditEmailManagementComponent } from './edit-email-management/edit-email-management.component';
import { DeleteEmailManagementComponent } from './delete-email-management/delete-email-management.component';
// import { EmailManagementComponent } from './email-management.component';

const ENTRY_COMPONENTS = [
  AddEmailManagementComponent,
  EditEmailManagementComponent,
  DeleteEmailManagementComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule,
    NgxPaginationModule,
  ],
  declarations: [
    AddEmailManagementComponent,
    EditEmailManagementComponent,
    DeleteEmailManagementComponent,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],


})
export class EmailManagementModule { }
