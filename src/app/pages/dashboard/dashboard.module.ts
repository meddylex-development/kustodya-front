import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from '../user/my-account/my-account.component';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { ReportsComponent } from '../reports/reports.component';

import { NgxDocViewerModule } from 'ngx-doc-viewer';

// import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartsModule } from 'angular2-chartjs';
// import { ChartsModule } from 'ng2-charts';

import { IncapacityComponent } from '../incapacity/incapacity.component';
import { IncapacityIssuanceComponent } from '../incapacity/incapacity-issuance/incapacity-issuance.component';
import { IncapacityUserComponent } from '../incapacity/incapacity-user/incapacity-user.component';
import { IncapacityHistoryComponent } from '../incapacity/incapacity-history/incapacity-history.component';
import { IncapacityDiagnosticComponent } from '../incapacity/incapacity-diagnostic/incapacity-diagnostic.component';

import { CheckDiagnosticComponent } from '../incapacity/check-diagnostic/check-diagnostic.component';
import { IncapacityRehabilitationConceptComponent } from '../incapacity/emission/incapacity-rehabilitation-concept/incapacity-rehabilitation-concept.component';
import { PreviewRehabilitationConceptComponent } from '../incapacity/emission/preview-rehabilitation-concept/preview-rehabilitation-concept.component';
import { StatisticAnalysisComponent } from '../statistic-analysis/statistic-analysis.component';
import { PowerbiCie10Component } from '../powerBI/powerbi-cie10/powerbi-cie10.component';
import { EmailManagementComponent } from '../email-management/email-management.component';

import { TranscriptionComponent } from '../transcription/transcription.component';
import { TranscriptionIssuanceComponent } from '../transcription/transcription-issuance/transcription-issuance.component';
import { TranscriptionUserComponent } from '../transcription/transcription-user/transcription-user.component';
import { TranscriptionHistoryComponent } from '../transcription/transcription-history/transcription-history.component';
import { TranscriptionDiagnosticComponent } from '../transcription/transcription-diagnostic/transcription-diagnostic.component';
import { TranscriptionCkeckComponent } from '../transcription/transcription-ckeck/transcription-ckeck.component';
import { TranscriptionPrintComponent } from '../transcription/transcription-print/transcription-print.component';

import { PowerbiReportsComponent } from '../powerBI/powerbi-reports/powerbi-reports.component';
import { RethusComponent } from '../rethus/rethus.component';
import { RethusHistoricoComponent } from '../rethus/rethus-historico/rethus-historico.component';
import { RethusBulkUploadComponent } from '../rethus/rethus-bulk-upload/rethus-bulk-upload.component';
import { RethusReportsComponent } from '../rethus/rethus-reports/rethus-reports.component';
import { RethusIndividualSearchComponent } from '../rethus/rethus-individual-search/rethus-individual-search.component';

import { UsersComponent } from '../administration/users/users.component';
import { ParameterizationComponent } from '../parameterization/parameterization.component';
import { AddUserComponent } from '../administration/users/add-user/add-user.component';
import { EditUserComponent } from '../administration/users/edit-user/edit-user.component';
import { DeleteUserComponent } from '../administration/users/delete-user/delete-user.component';

import { UserBasicInfoComponent } from '../administration/users/user-basic-info/user-basic-info.component';
import { UsersListComponent } from '../administration/users/users-list/users-list.component';
import { UserTabsComponent } from '../administration/users/user-tabs/user-tabs.component';
import { ContactComponent } from '../administration/users/contact/contact.component';

import { UserPhoneNumbersComponent } from '../administration/users/contact/telephone/user-phone-numbers/user-phone-numbers.component';
import { UserAddPhoneNumberComponent } from '../administration/users/contact/telephone/user-add-phone-number/user-add-phone-number.component';
import { UserEditPhoneNumberComponent } from '../administration/users/contact/telephone/user-edit-phone-number/user-edit-phone-number.component';
import { UserDeletePhoneNumberComponent } from '../administration/users/contact/telephone/user-delete-phone-number/user-delete-phone-number.component';

import { UserAddressComponent } from '../administration/users/contact/address/user-address/user-address.component';
import { UserAddAddressComponent } from '../administration/users/contact/address/user-add-address/user-add-address.component';
import { UserEditAddressComponent } from '../administration/users/contact/address/user-edit-address/user-edit-address.component';
import { UserDeleteAddressComponent } from '../administration/users/contact/address/user-delete-address/user-delete-address.component';

import { UserEmailAddressComponent } from '../administration/users/contact/email/user-email-address/user-email-address.component';
import { UserAddEmailAddressComponent } from '../administration/users/contact/email/user-add-email-address/user-add-email-address.component';
import { UserEditEmailAddressComponent } from '../administration/users/contact/email/user-edit-email-address/user-edit-email-address.component';
import { UserDeleteEmailAddressComponent } from '../administration/users/contact/email/user-delete-email-address/user-delete-email-address.component';

import { UserSocialNetworkComponent } from '../administration/users/contact/social-network/user-social-network/user-social-network.component';
import { UserAddSocialNetworkComponent } from '../administration/users/contact/social-network/user-add-social-network/user-add-social-network.component';
import { UserEditSocialNetworkComponent } from '../administration/users/contact/social-network/user-edit-social-network/user-edit-social-network.component';
import { UserDeleteSocialNetworkComponent } from '../administration/users/contact/social-network/user-delete-social-network/user-delete-social-network.component';

import { ContactEntityComponent } from '../administration/entities/contact/contact.component';

import { EntityPhoneNumbersComponent } from '../administration/entities/contact/telephone/entity-phone-numbers/entity-phone-numbers.component';
import { EntityAddPhoneNumberComponent } from '../administration/entities/contact/telephone/entity-add-phone-number/entity-add-phone-number.component';
import { EntityEditPhoneNumberComponent } from '../administration/entities/contact/telephone/entity-edit-phone-number/entity-edit-phone-number.component';
import { EntityDeletePhoneNumberComponent } from '../administration/entities/contact/telephone/entity-delete-phone-number/entity-delete-phone-number.component';

import { EntityAddressComponent } from '../administration/entities/contact/address/entity-address/entity-address.component';
import { EntityAddAddressComponent } from '../administration/entities/contact/address/entity-add-address/entity-add-address.component';
import { EntityEditAddressComponent } from '../administration/entities/contact/address/entity-edit-address/entity-edit-address.component';
import { EntityDeleteAddressComponent } from '../administration/entities/contact/address/entity-delete-address/entity-delete-address.component';

import { EntityEmailAddressComponent } from '../administration/entities/contact/email/entity-email-address/entity-email-address.component';
import { EntityAddEmailAddressComponent } from '../administration/entities/contact/email/entity-add-email-address/entity-add-email-address.component';
import { EntityEditEmailAddressComponent } from '../administration/entities/contact/email/entity-edit-email-address/entity-edit-email-address.component';
import { EntityDeleteEmailAddressComponent } from '../administration/entities/contact/email/entity-delete-email-address/entity-delete-email-address.component';

import { EntitySocialNetworkComponent } from '../administration/entities/contact/social-network/entity-social-network/entity-social-network.component';
import { EntityAddSocialNetworkComponent } from '../administration/entities/contact/social-network/entity-add-social-network/entity-add-social-network.component';
import { EntityEditSocialNetworkComponent } from '../administration/entities/contact/social-network/entity-edit-social-network/entity-edit-social-network.component';
import { EntityDeleteSocialNetworkComponent } from '../administration/entities/contact/social-network/entity-delete-social-network/entity-delete-social-network.component';

import { EntityComponent } from "../administration/users/entity/entity.component";

import { DigitalSignatureComponent } from '../administration/users/digital-signature/digital-signature.component';

import { ProfilesComponent } from '../administration/profiles/profiles.component';
import { AddProfileComponent } from '../administration/profiles/add-profile/add-profile.component';
import { EditProfileComponent } from '../administration/profiles/edit-profile/edit-profile.component';
import { ProfilesListComponent } from '../administration/profiles/profiles-list/profiles-list.component';
import { DeleteProfilesComponent } from '../administration/profiles/delete-profiles/delete-profiles.component';

import { AccountingAuditComponent } from "../accounting-audit/accounting-audit.component";
import { AccountingAuditListComponent } from "../accounting-audit/accounting-audit-list/accounting-audit-list.component";
import { AccountingAuditTabsComponent } from "../accounting-audit/accounting-audit-tabs/accounting-audit-tabs.component";
import { AccountingAuditBasicInfoComponent } from "../accounting-audit/accounting-audit-basic-info/accounting-audit-basic-info.component";
import { AuditComponent } from "../accounting-audit/accounting-audit-detail-list/audit.component";
import { AccountingAuditNotesComponent } from "../accounting-audit/accounting-audit-notes/accounting-audit-notes.component";
import { DeleteAccountingAuditComponent } from "../accounting-audit/delete-accounting-audit/delete-accounting-audit.component";
import { AddAccountingComponent } from "../accounting-audit/add-accounting-detail/add-accounting.component";
import { AddAccountingAuditComponent } from "../accounting-audit/add-accounting-audit/add-accounting-audit.component";
import { DeleteAccountingDetailComponent } from "../accounting-audit/delete-accounting-detail/delete-accounting-detail.component";
import { EditAccountingDetailComponent } from "../accounting-audit/edit-accounting-detail/edit-accounting-detail.component";
import { AccountingAuditSignaturesComponent } from "../accounting-audit/accounting-audit-signatures/accounting-audit-signatures.component";
import { PreviewPdfAccountingDetailComponent } from '../accounting-audit/preview-pdf-accounting-detail/preview-pdf-accounting-detail.component';

import { AccountingNumberComponent } from "../parameterization/accounting-number/accounting-number.component";
import { AddAccountingNumberComponent } from "../parameterization/accounting-number/add-accounting-number/add-accounting-number.component";
import { EditAccountingNumberComponent } from "../parameterization/accounting-number/edit-accounting-number/edit-accounting-number.component";
import { DeleteAccountingNumberComponent } from "../parameterization/accounting-number/delete-accounting-number/delete-accounting-number.component";
import { PUCComponent } from "../parameterization/puc/puc.component";
import { EditPUCComponent } from "../parameterization/puc/edit-puc/edit-puc.component";
import { DescriptionComponent } from "../parameterization/description/description.component";
import { EditDescriptionComponent } from "../parameterization/description/edit-description/edit-description.component";
import { DocumentTypeComponent } from "../parameterization/document-type/document-type.component";
import { AddDocumentTypeComponent } from "../parameterization/document-type/add-document-type/add-document-type.component";
import { EditDocumentTypeComponent } from "../parameterization/document-type/edit-document-type/edit-document-type.component";
import { DeleteDocumentTypeComponent } from "../parameterization/document-type/delete-document-type/delete-document-type.component";
import { AdjustmentTypeComponent } from "../parameterization/adjustment-type/adjustment-type.component";
import { AddAdjustmentTypeComponent } from "../parameterization/adjustment-type/add-adjustment-type/add-adjustment-type.component";
import { EditAdjustmentTypeComponent } from "../parameterization/adjustment-type/edit-adjustment-type/edit-adjustment-type.component";
import { DeleteAdjustmentTypeComponent } from "../parameterization/adjustment-type/delete-adjustment-type/delete-adjustment-type.component";
import { TabDescriptionComponent } from "../parameterization/tab-description/tab-description.component";
import { AddTabDescriptionComponent } from "../parameterization/tab-description/add-tab-description/add-tab-description.component";
import { EditTabDescriptionComponent } from "../parameterization/tab-description/edit-tab-description/edit-tab-description.component";
import { DeleteTabDescriptionComponent } from "../parameterization/tab-description/delete-tab-description/delete-tab-description.component";
import { EditAdminSignatureComponent } from "../parameterization/tab-description/edit-admin-signature/edit-admin-signature.component";
import { ParameterizationTabsComponent } from "../parameterization/parameterization-tabs/parameterization-tabs.component";

import { EntitiesComponent } from "../administration/entities/entities.component";
import { EntitiesListComponent } from "../administration/entities/entities-list/entities-list.component";
import { AddEntityComponent } from "../administration/entities/add-entity/add-entity.component";
import { EntitiesTabsComponent } from "../administration/entities/entities-tabs/entities-tabs.component";
import { EntityBasicInfoComponent } from "../administration/entities/entity-basic-info/entity-basic-info.component";
import { EntityAdministratorListComponent } from "../administration/entities/entity-administrator-list/entity-administrator-list.component";
import { EditAdministratorComponent } from "../administration/entities/entity-administrator-list/edit-administrator/edit-administrator.component";
import { DeleteAdministratorComponent } from "../administration/entities/entity-administrator-list/delete-administrator/delete-administrator.component";
import { EntityLogoComponent } from "../administration/entities/entity-logo/entity-logo.component";
import { EntityOtherInfoComponent } from '../administration/entities/entity-other-info/entity-other-info.component';
import { EntityAddOtherInfoComponent } from '../administration/entities/entity-other-info/entity-add-other-info/entity-add-other-info.component';
import { EntityEditOtherInfoComponent } from '../administration/entities/entity-other-info/entity-edit-other-info/entity-edit-other-info.component';
import { EntityDeleteOtherInfoComponent } from '../administration/entities/entity-other-info/entity-delete-other-info/entity-delete-other-info.component';
import { EntityDeleteEntityComponent } from '../administration/entities/entity-delete-entity/entity-delete-entity.component';

import { AccountingAuditNoteEditComponent } from '../accounting-audit/accounting-audit-notes/accounting-audit-note-edit/accounting-audit-note-edit.component';
import { ChangeStateAccountingAuditComponent } from '../accounting-audit/change-state-accounting-audit/change-state-accounting-audit.component';

import { ModalInactivityUserComponent } from '../powerBI/modal-inactivity-user/modal-inactivity-user.component';

import { RehabilitationConceptComponent } from '../rehabilitation-concept/rehabilitation-concept.component';
import { RehabilitationConceptDashboardComponent } from '../rehabilitation-concept/rehabilitation-concept-dashboard/rehabilitation-concept-dashboard.component';
import { RehabilitationConceptTabsDashboardComponent } from '../rehabilitation-concept/rehabilitation-concept-tabs-dashboard/rehabilitation-concept-tabs-dashboard.component';
import { RehabilitationConceptTabsComponent } from '../rehabilitation-concept/rehabilitation-concept-tabs/rehabilitation-concept-tabs.component';
import { RehabilitationConceptListComponent } from '../rehabilitation-concept/rehabilitation-concept-list/rehabilitation-concept-list.component';
import { RehabilitationConceptBasicInfoComponent } from '../rehabilitation-concept/rehabilitation-concept-basic-info/rehabilitation-concept-basic-info.component';

import { RehabilitationConceptIncapacitiesHistoryComponent } from '../rehabilitation-concept/rehabilitation-concept-incapacities-history/rehabilitation-concept-incapacities-history.component';
import { RehabilitationConceptHistoryListComponent } from '../rehabilitation-concept/rehabilitation-concept-history-list/rehabilitation-concept-history-list.component';
import { RehabilitationConceptDetailHistoryComponent } from '../rehabilitation-concept/rehabilitation-concept-detail-history/rehabilitation-concept-detail-history.component';
import { RehabilitationConceptDetailPreviewComponent } from '../rehabilitation-concept/rehabilitation-concept-detail-preview/rehabilitation-concept-detail-preview.component';

import { OriginQualificationComponent } from '../origin-qualification/origin-qualification.component';
import { OriginQualificationListComponent } from '../origin-qualification/origin-qualification-list/origin-qualification-list.component';
import { OriginQualificationTranscriptionComponent } from '../origin-qualification/origin-qualification-transcription/origin-qualification-transcription.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxPrintModule } from 'ngx-print';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxPaginationModule } from 'ngx-pagination';

/* ************+ Import module ngx-bootstrap-datepicker ************ */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
/* ************+ Import module ngx-bootstrap-datepicker ************ */

const ENTRY_COMPONENTS = [
  DashboardComponent,
  MyAccountComponent,
  ReportsComponent,
  IncapacityComponent,
  IncapacityIssuanceComponent,
  IncapacityUserComponent,
  IncapacityHistoryComponent,
  IncapacityDiagnosticComponent,
  CheckDiagnosticComponent,
  IncapacityRehabilitationConceptComponent,
  PreviewRehabilitationConceptComponent,
  StatisticAnalysisComponent,
  PowerbiCie10Component,
  EmailManagementComponent,
  TranscriptionComponent,
  TranscriptionIssuanceComponent,
  TranscriptionUserComponent,
  TranscriptionHistoryComponent,
  TranscriptionDiagnosticComponent,
  TranscriptionCkeckComponent,
  TranscriptionPrintComponent,
  PowerbiReportsComponent,
  RethusComponent,
  RethusHistoricoComponent,
  RethusBulkUploadComponent,
  RethusReportsComponent,
  RethusIndividualSearchComponent,
  UsersComponent,
  AddUserComponent,
  EditUserComponent,
  DeleteUserComponent,
  UserBasicInfoComponent,
  UsersListComponent,
  UserTabsComponent,
  ContactComponent,
  UserPhoneNumbersComponent,
  UserAddPhoneNumberComponent,
  UserEditPhoneNumberComponent,
  UserDeletePhoneNumberComponent,
  UserAddressComponent,
  UserAddAddressComponent,
  UserEditAddressComponent,
  UserDeleteAddressComponent,
  UserEmailAddressComponent,
  UserAddEmailAddressComponent,
  UserEditEmailAddressComponent,
  UserDeleteEmailAddressComponent,
  UserSocialNetworkComponent,
  UserAddSocialNetworkComponent,
  UserEditSocialNetworkComponent,
  UserDeleteSocialNetworkComponent,
  EntityComponent,
  ContactEntityComponent,
  EntityPhoneNumbersComponent,
  EntityAddPhoneNumberComponent,
  EntityEditPhoneNumberComponent,
  EntityDeletePhoneNumberComponent,
  EntityAddressComponent,
  EntityAddAddressComponent,
  EntityEditAddressComponent,
  EntityDeleteAddressComponent,
  EntityEmailAddressComponent,
  EntityAddEmailAddressComponent,
  EntityEditEmailAddressComponent,
  EntityDeleteEmailAddressComponent,
  EntitySocialNetworkComponent,
  EntityAddSocialNetworkComponent,
  EntityEditSocialNetworkComponent,
  EntityDeleteSocialNetworkComponent,
  DigitalSignatureComponent,
  ProfilesComponent,
  AddProfileComponent,
  EditProfileComponent,
  ProfilesListComponent,
  DeleteProfilesComponent,
  AccountingAuditComponent,
  AccountingAuditListComponent,
  AccountingAuditTabsComponent,
  AccountingAuditBasicInfoComponent,
  AuditComponent,
  AccountingAuditNotesComponent,
  DeleteAccountingAuditComponent,
  AddAccountingComponent,
  AddAccountingAuditComponent,
  DeleteAccountingDetailComponent,
  EditAccountingDetailComponent,
  AccountingAuditSignaturesComponent,
  PreviewPdfAccountingDetailComponent,
  EntitiesComponent,
  EntitiesListComponent,
  AddEntityComponent,
  EntitiesTabsComponent,
  EntityBasicInfoComponent,
  EntityAdministratorListComponent,
  EditAdministratorComponent,
  DeleteAdministratorComponent,
  EntityLogoComponent,
  EntityOtherInfoComponent,
  EntityAddOtherInfoComponent,
  EntityEditOtherInfoComponent,
  EntityDeleteOtherInfoComponent,
  EntityDeleteEntityComponent,
  AccountingNumberComponent,
  AddAccountingNumberComponent,
  EditAccountingNumberComponent,
  DeleteAccountingNumberComponent,
  PUCComponent,
  EditPUCComponent,
  DescriptionComponent,
  EditDescriptionComponent,
  DocumentTypeComponent,
  AddDocumentTypeComponent,
  EditDocumentTypeComponent,
  DeleteDocumentTypeComponent,
  AdjustmentTypeComponent,
  AddAdjustmentTypeComponent,
  EditAdjustmentTypeComponent,
  DeleteAdjustmentTypeComponent,
  TabDescriptionComponent,
  AddTabDescriptionComponent,
  EditTabDescriptionComponent,
  DeleteTabDescriptionComponent,
  EditAdminSignatureComponent,
  ParameterizationTabsComponent,
  AccountingAuditNoteEditComponent,
  ChangeStateAccountingAuditComponent,
  RehabilitationConceptComponent,
  RehabilitationConceptDashboardComponent,
  RehabilitationConceptTabsDashboardComponent,
  RehabilitationConceptTabsComponent,
  RehabilitationConceptListComponent,
  RehabilitationConceptBasicInfoComponent,
  RehabilitationConceptIncapacitiesHistoryComponent,
  RehabilitationConceptHistoryListComponent,
  RehabilitationConceptDetailHistoryComponent,
  RehabilitationConceptDetailPreviewComponent,
  OriginQualificationComponent,
  OriginQualificationListComponent,
  OriginQualificationTranscriptionComponent,
  ParameterizationComponent,
  TermsConditionsComponent,
  ModalInactivityUserComponent,
];

@NgModule({
  declarations: [
    DashboardComponent,
    MyAccountComponent,
    ReportsComponent,
    IncapacityComponent,
    IncapacityIssuanceComponent,
    IncapacityUserComponent,
    IncapacityHistoryComponent,
    IncapacityDiagnosticComponent,
    CheckDiagnosticComponent,
    IncapacityRehabilitationConceptComponent,
    PreviewRehabilitationConceptComponent,
    StatisticAnalysisComponent,
    PowerbiCie10Component,
    CapitalizePipe,
    EmailManagementComponent,
    TranscriptionComponent,
    TranscriptionIssuanceComponent,
    TranscriptionUserComponent,
    TranscriptionHistoryComponent,
    TranscriptionDiagnosticComponent,
    TranscriptionCkeckComponent,
    TranscriptionPrintComponent,
    PowerbiReportsComponent,
    RethusComponent,
    RethusHistoricoComponent,
    RethusBulkUploadComponent,
    RethusReportsComponent,
    RethusIndividualSearchComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserBasicInfoComponent,
    UsersListComponent,
    UserTabsComponent,
    ContactComponent,
    UserPhoneNumbersComponent,
    UserAddPhoneNumberComponent,
    UserEditPhoneNumberComponent,
    UserDeletePhoneNumberComponent,
    UserAddressComponent,
    UserAddAddressComponent,
    UserEditAddressComponent,
    UserDeleteAddressComponent,
    UserEmailAddressComponent,
    UserAddEmailAddressComponent,
    UserEditEmailAddressComponent,
    UserDeleteEmailAddressComponent,
    UserSocialNetworkComponent,
    UserAddSocialNetworkComponent,
    UserEditSocialNetworkComponent,
    UserDeleteSocialNetworkComponent,

    EntityComponent,
    ContactEntityComponent,
    EntityPhoneNumbersComponent,
    EntityAddPhoneNumberComponent,
    EntityEditPhoneNumberComponent,
    EntityDeletePhoneNumberComponent,
    EntityAddressComponent,
    EntityAddAddressComponent,
    EntityEditAddressComponent,
    EntityDeleteAddressComponent,
    EntityEmailAddressComponent,
    EntityAddEmailAddressComponent,
    EntityEditEmailAddressComponent,
    EntityDeleteEmailAddressComponent,
    EntitySocialNetworkComponent,
    EntityAddSocialNetworkComponent,
    EntityEditSocialNetworkComponent,
    EntityDeleteSocialNetworkComponent,

    DigitalSignatureComponent,
    ProfilesComponent,
    AddProfileComponent,
    EditProfileComponent,
    ProfilesListComponent,
    DeleteProfilesComponent,
    AccountingAuditComponent,
    AccountingAuditListComponent,
    AccountingAuditTabsComponent,
    AccountingAuditBasicInfoComponent,
    AuditComponent,
    AccountingAuditNotesComponent,
    DeleteAccountingAuditComponent,
    AddAccountingComponent,
    AddAccountingAuditComponent,
    DeleteAccountingDetailComponent,
    EditAccountingDetailComponent,
    AccountingAuditSignaturesComponent,
    PreviewPdfAccountingDetailComponent,
    EntitiesComponent,
    EntitiesListComponent,
    AddEntityComponent,
    EntitiesTabsComponent,
    EntityBasicInfoComponent,
    EntityAdministratorListComponent,
    EditAdministratorComponent,
    DeleteAdministratorComponent,
    EntityLogoComponent,
    EntityOtherInfoComponent,
    EntityAddOtherInfoComponent,
    EntityEditOtherInfoComponent,
    EntityDeleteOtherInfoComponent,
    EntityDeleteEntityComponent,
    AccountingNumberComponent,
    AddAccountingNumberComponent,
    EditAccountingNumberComponent,
    DeleteAccountingNumberComponent,
    PUCComponent,
    EditPUCComponent,
    DescriptionComponent,
    EditDescriptionComponent,
    DocumentTypeComponent,
    AddDocumentTypeComponent,
    EditDocumentTypeComponent,
    DeleteDocumentTypeComponent,
    AdjustmentTypeComponent,
    AddAdjustmentTypeComponent,
    EditAdjustmentTypeComponent,
    DeleteAdjustmentTypeComponent,
    TabDescriptionComponent,
    AddTabDescriptionComponent,
    EditTabDescriptionComponent,
    DeleteTabDescriptionComponent,
    EditAdminSignatureComponent,
    ParameterizationTabsComponent,
    AccountingAuditNoteEditComponent,
    ChangeStateAccountingAuditComponent,
    RehabilitationConceptComponent,
    RehabilitationConceptDashboardComponent,
    RehabilitationConceptTabsDashboardComponent,
    RehabilitationConceptTabsComponent,
    RehabilitationConceptListComponent,
    RehabilitationConceptBasicInfoComponent,
    RehabilitationConceptIncapacitiesHistoryComponent,
    RehabilitationConceptHistoryListComponent,
    RehabilitationConceptDetailHistoryComponent,
    RehabilitationConceptDetailPreviewComponent,
    OriginQualificationComponent,
    OriginQualificationListComponent,
    OriginQualificationTranscriptionComponent,
    ParameterizationComponent,
    TermsConditionsComponent,
    ModalInactivityUserComponent,
  ],
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    CommonModule,
    NgSelectModule,
    NgxQRCodeModule,
    NgxPrintModule,
    GoogleChartsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    NgxDocViewerModule,
    // NgxEchartsModule,
    // NgxChartsModule,
    // ChartsModule,
  ],
  // providers: [CapitalizePipe],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class DashboardModule { }
