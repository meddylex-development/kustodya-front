import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogRef } from '@nebular/theme';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'ngx-preview-pdf-accounting-detail',
  templateUrl: './preview-pdf-accounting-detail.component.html',
  styleUrls: ['./preview-pdf-accounting-detail.component.scss']
})
export class PreviewPdfAccountingDetailComponent implements OnInit {

  @Input() accounting_audit_data: any;
  public current_payload: string = null;
  submitted: boolean = false;

  user_id: any = null;
  user_data: any = {};
  token: any = null;
  flag_button_select: boolean = false;
  id_type_template: any = null;
  file_pdf_preview: any = null;

  search_input: any = '';
  list_templates: any = [];
  list_templates_original: any = [];
  collection_templates: any = [];
  numItemsPage: number = null;
  // numItemsPage: number = 10;
  currentPage: number = null;
  totalItems: number = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<PreviewPdfAccountingDetailComponent>,
  ) {
    router.events.subscribe((val) => {
      this.dismiss();
      this.utilitiesService.fnSetLocalStorage('view_report', false);
    });
  }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('payload');
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
      self.fnGetDataPDFAccountingAudit(self.token, self.accounting_audit_data['id']);
    } else {
      self.router.navigateByUrl('');
    }
  }


  fnGetDataPDFAccountingAudit(token, id_accounting_audit) {
    const self = this;
    self.submitted = true;
    self.file_pdf_preview = null;
    self.fnGetPDFAccountingAudit(token, id_accounting_audit, function (resp_signature) {
      const file_blob = JSON.parse(JSON.stringify(resp_signature));
      self.showFile(resp_signature);
      // if (resp_signature['status'] !== 404) {
      //   self.submitted = false;
      //   var reader = new FileReader();
      //   reader.readAsDataURL(resp_signature);
      //   reader.onloadend = function() {
      //       var base64data = reader.result;
      //       var str = base64data + '';
      //       var res = str.replace('application/octet-stream', 'application/pdf');
      //       self.file_pdf_preview = res;
      //   };
      // } else {
      //   self.file_pdf_preview = null;
      //   self.submitted = false;
      // }
    });

  }

  fnGetPDFAccountingAudit(token, id_accounting_audit, callback) {
    const self = this;
    self.auditService.fnHttpGetPDFAccountingAudit(token, id_accounting_audit).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  showFile(blob){
    const self = this;
    // self.file_pdf_preview = blob;
    const url = window.URL.createObjectURL(blob);

    // i.e. display the PDF content via iframe
    document.querySelector("iframe").src = url;

    //   var reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   reader.onloadend = function() {
    //       var base64data = reader.result;
    //       var str = base64data + '';
    //       self.file_pdf_preview = str;
    //       // var res = str.replace('application/octet-stream', 'application/pdf');
    //       // self.file_pdf_preview = self.sanitizer.bypassSecurityTrustResourceUrl(str);
    //   };
  }

  fnClosePreviewAccountingAuditDetail() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

  fnFindDataUserRethus(document_type, document_number) {
    $('#item_menu_1_a_8').click();
  }

}
