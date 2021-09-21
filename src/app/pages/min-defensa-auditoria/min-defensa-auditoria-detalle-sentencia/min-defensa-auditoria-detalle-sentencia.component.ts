import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
// import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';
import { UserService } from '../../../shared/api/services/user.service';

import * as moment from 'moment';
import { Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { timeout } from 'rxjs/operators';

// import * as jsPDF from 'jspdf';
import { jsPDF } from "jspdf";
import * as html2canvast from 'html2canvas';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

declare var $: any;

@Component({
  selector: 'ngx-min-defensa-auditoria-detalle-sentencia',
  templateUrl: './min-defensa-auditoria-detalle-sentencia.component.html',
  styleUrls: ['./min-defensa-auditoria-detalle-sentencia.component.scss']
})
export class MinDefensaAuditoriaDetalleSentenciaComponent implements OnInit {

  @ViewChild('pdfViewer') pdfViewer: ElementRef;

  @Output() flagCreateEntity = new EventEmitter<object>();
  @Input() data_object: any;
  data_new_entity: any = {};
  loading_state: any = false;
  user_id: any = null;
  image_signature_user: any = null;

  object_patient: any = {
    'patient_creation_date': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_firstname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_lastname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_fullname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_email': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_document_number': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_city': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_phone_number': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_first_code': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_second_code': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_eps': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_company': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_company_email': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_afp': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_birth': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_position': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_type_test': { 'texto': 'RT-PCR', 'guid': '', 'nombreArchivo':'' },
    'patient_covid_date': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    'patient_date_clinic_history': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
  };

  // patient_transcription_date: any = '';
  // patient_firstname: any = '';
  // patient_lastname: any = '';
  // patient_fullname: string = '';
  // patient_document_number: any = '';
  // patient_city: any = '';
  // patient_phone_number: any = '';
  // patient_first_code: any = '';
  // patient_second_code: any = '';
  // patient_eps: any = '';
  // patient_company: any = '';
  // patient_company_email: any = '';
  // patient_afp: any = '';
  // patient_birth: any = '';
  // patient_position: any = '';
  file_input_signature: any = null;
  imageSrc: any = null;
  current_payload: string = null;
  data_transcription: any = {};
  attached_files: Array<any> = [];

  show_preview_file: boolean = false;
  format_letter: any = true;
  format_web: any = false;
  current_date: number = 1606228736;
  url_file_preview: any = null;
  url_file: string = '';
  url_extension: string = '';

  colorTheme = 'theme-green';
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate = new Date();
  locale = 'es';

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public originQualificationService: OriginQualificationService,
    public utilitiesService: UtilitiesService,
    protected sanitizer: DomSanitizer,
    private userService: UserService,
    private bsLocaleService: BsLocaleService,
    // private capitalizePipe: CapitalizePipe,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    const self = this;
    self.bsLocaleService.use('es');
    // self.data_object
    console.log('self.data_object: ', self.data_object);
    $(document).ready(function () {
      // $('#kstdy-button-back-concept').click();
      $('#form-section').draggable();
    });
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;


        self.user_id = parseInt(self.utilitiesService.fnGetSessionStorage('user_id'), 10);
        if (self.user_id) {
          // self.fnGetDataSignature(self.current_payload, self.user_id);
          self.attached_files = self.data_object['adjuntos'];
          console.log('self.attached_files: ', self.attached_files);
          // self.fnGetOriginQualificationData(self.current_payload, self.data_object['id']);
        } else {
          self.router.navigateByUrl('');
        }

        
      } else {
        // self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataSignature(token, user_id) {
    const self = this;
    self.image_signature_user = null;
    self.fnGetSignatureUser(token, user_id, function (resp_signature) {
      const image_blob = JSON.parse(JSON.stringify(resp_signature));
      if (resp_signature['status'] !== 404) {
        var reader = new FileReader();
        reader.readAsDataURL(resp_signature);
        reader.onloadend = function() {
            var base64data = reader.result;
            var str = base64data + '';
            var res = str.replace('application/octet-stream', 'image/png');
            self.image_signature_user = res;
            self.imageSrc = res;
        };
      } else {
        self.image_signature_user = null;
      }
    });

  }

  fnGetSignatureUser(current_payload, user_id, callback) {
    this.userService.fnHttpGetSignatureUser(current_payload, user_id).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnSaveTranscription() {
    const self = this;
    self.loading_state = true;
    const obj_send = {
      'fecha': (self.object_patient['patient_creation_date']['texto']) ? self.object_patient['patient_creation_date']['texto'] : null,
      'fechaCovid': (self.object_patient['patient_covid_date']['texto']) ? self.object_patient['patient_covid_date']['texto'] : null,
      'nombre': (self.object_patient['patient_fullname']['texto']) ? self.object_patient['patient_fullname']['texto'] : null,
      'correoPaciente': (self.object_patient['patient_email']['texto']) ? self.object_patient['patient_email']['texto'] : null,
      'identificacion': (self.object_patient['patient_document_number']['texto']) ? self.object_patient['patient_document_number']['texto'] : null,
      'telefono': (self.object_patient['patient_phone_number']['texto']) ? self.object_patient['patient_phone_number']['texto'] : null,
      'ciudad': (self.object_patient['patient_city']['texto']) ? self.object_patient['patient_city']['texto'] : null,
      'enfermedadLaboral': (self.object_patient['patient_first_code']['texto']) ? self.object_patient['patient_first_code']['texto'] : null,
      'contrato': (self.object_patient['patient_second_code']['texto']) ? self.object_patient['patient_second_code']['texto'] : null,
      'eps': (self.object_patient['patient_eps']['texto']) ? self.object_patient['patient_eps']['texto'] : null,
      'empresa': (self.object_patient['patient_company']['texto']) ? self.object_patient['patient_company']['texto'] : null,
      'empresaCorreo': (self.object_patient['patient_company_email']['texto']) ? self.object_patient['patient_company_email']['texto'] : null,
      'afp': (self.object_patient['patient_afp']['texto']) ? self.object_patient['patient_afp']['texto'] : null,
      'edad': (self.object_patient['patient_birth']['texto']) ? self.object_patient['patient_birth']['texto'] : null,
      'cargo': (self.object_patient['patient_position']['texto']) ? self.object_patient['patient_position']['texto'] : null,
      'tipoPrueba': (self.object_patient['patient_type_test']['texto']) ? self.object_patient['patient_type_test']['texto'] : null,
      'fechaHistoriaClinica': (self.object_patient['patient_date_clinic_history']['texto']) ? self.object_patient['patient_date_clinic_history']['texto'] : null,
    };
    self.originQualificationService.fnHttpPutOriginQualificationData(self.current_payload, obj_send, self.data_object['id']).subscribe(resp_put => {
      if (resp_put.status == 200) {
        self.loading_state = false;
        self.utilitiesService.showToast('top-right', 'success', 'Los datos de la transcripción se han guardado correctamente!');
      }
    }, err => {
      self.loading_state = false;
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error! Intentlo nuevamente.');
    });

  }

  fnGetOriginQualificationData(current_payload, guid_id) {
    const self = this;
    self.loading_state = true;
    self.originQualificationService.fnHttpGetOriginQualificationData(current_payload, guid_id).subscribe(resp_get_data => {
      console.log('resp_get_data: ', resp_get_data);
      if (resp_get_data.status == 200) {
        self.data_transcription = resp_get_data['body'];
        // const full_name = this.capitalizePipe.transform(self.data_transcription['nombre']);
        self.object_patient = {
          'patient_creation_date': (self.data_transcription['fecha']) ? self.data_transcription['fecha'] : self.object_patient['patient_creation_date'],
          'patient_firstname': (self.data_transcription['nombre']) ? self.data_transcription['nombre'] : self.object_patient['patient_firstname'],
          'patient_lastname': (self.data_transcription['nombre']) ? self.data_transcription['nombre'] : self.object_patient['patient_lastname'],
          'patient_fullname': (self.data_transcription['nombre']) ? self.data_transcription['nombre'] : self.object_patient['patient_fullname'],
          'patient_email': (self.data_transcription['correoPaciente']) ? self.data_transcription['correoPaciente'] : self.object_patient['patient_email'],
          'patient_document_number': (self.data_transcription['identificacion']) ? self.data_transcription['identificacion'] : self.object_patient['patient_document_number'],
          'patient_city': (self.data_transcription['ciudad']) ? self.data_transcription['ciudad'] : self.object_patient['patient_city'],
          'patient_phone_number': (self.data_transcription['telefono']) ? self.data_transcription['telefono'] : self.object_patient['patient_phone_number'],
          'patient_first_code': (self.data_transcription['enfermedadLaboral']) ? self.data_transcription['enfermedadLaboral'] : self.object_patient['patient_first_code'],
          'patient_second_code': (self.data_transcription['contrato']) ? self.data_transcription['contrato'] : self.object_patient['patient_second_code'],
          'patient_eps': (self.data_transcription['eps']) ? self.data_transcription['eps'] : self.object_patient['patient_eps'],
          'patient_company': (self.data_transcription['empresa']) ? self.data_transcription['empresa'] : self.object_patient['patient_company'],
          'patient_company_email': (self.data_transcription['empresaCorreo']) ? self.data_transcription['empresaCorreo'] : self.object_patient['patient_company_email'],
          'patient_afp': (self.data_transcription['afp']) ? self.data_transcription['afp'] : self.object_patient['patient_afp'],
          'patient_birth': (self.data_transcription['edad']) ? self.data_transcription['edad'] : self.object_patient['patient_birth'],
          'patient_position': (self.data_transcription['cargo']) ? self.data_transcription['cargo'] : self.object_patient['patient_position'],
          'patient_type_test': (self.data_transcription['tipoPrueba']) ? self.data_transcription['tipoPrueba'] : self.object_patient['patient_type_test'],
          'patient_covid_date': (self.data_transcription['fechaCovid']) ? self.data_transcription['fechaCovid'] : self.object_patient['patient_covid_date'],
          'patient_date_clinic_history': (self.data_transcription['fechaHistoriaClinica']) ? self.data_transcription['fechaHistoriaClinica'] : self.object_patient['patient_date_clinic_history'],
        };
        self.attached_files = self.data_object['adjuntos'];
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnGoBackList() {
    $('#kstdy-button-back-concept').click();
  }

  fnUploadFile(id_element) {
    $('#' + id_element).click();
  }

  handleFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  fnClearForm() {
    this.object_patient = {
      'patient_creation_date': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_firstname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_lastname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_fullname': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_email': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_document_number': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_city': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_phone_number': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_first_code': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_second_code': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_eps': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_company': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_company_email': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_afp': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_birth': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_position': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_type_test': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
      'patient_date_clinic_history': { 'texto': '', 'guid': '', 'nombreArchivo':'' },
    };
    this.file_input_signature = null;
    this.imageSrc = null;
  }

  fnShowGoBackList() {

    const object_filter = {
      'status_list': this.data_object['status_list'],
      'search_input': this.data_object['search_input'],
      'currentPage': this.data_object['currentPage'],
      'date_range': this.data_object['date_range'],
      'start_date': this.data_object['start_date'],
      'end_date': this.data_object['end_date'],
    }

    const object_data = {
      'tab_id': 1,
      'data_object': object_filter,
    }
    this.flagCreateEntity.emit(object_data);
  }

  fnShowPreviewFileLabel(item_file) {
    const self = this;
    self.loading_state = true;
    self.show_preview_file = false;
    const file_explode = (item_file['nombreArchivo']).split();
    const file_guiid = item_file['guid'];

    self.fnGetPDFAccountingAudit(self.current_payload, file_guiid, function (resp_data) {
      const file_blob = JSON.parse(JSON.stringify(resp_data));
      self.showFile(resp_data);
      self.loading_state = false;
    });
  }

  fnShowPreview(item_file) {
    console.log('item_file: ', item_file);
    const self = this;
    self.loading_state = false;
    self.show_preview_file = false;
    const file_explode = (item_file['nombreArchivo']).split();
    const file_guiid = item_file['archivoId'];

    self.url_file_preview = file_guiid;
    console.log('self.url_file_preview: ', self.url_file_preview);
    self.show_preview_file = true;
    self.url_extension = (file_guiid).split(/[#?]/)[0].split('.').pop().trim();
    console.log('self.url_extension: ', self.url_extension);
    return false;
    // self.fnGetPDFAccountingAudit(self.current_payload, file_guiid, function (resp_data) {
    //   console.log('resp_data: ', resp_data);
    //   self.show_preview_file = true;
    //   console.log('resp_data.body.url: ', resp_data['body']['url']);
    //   self.url_extension = (resp_data['body']['url']).split(/[#?]/)[0].split('.').pop().trim();
    //   console.log('self.url_extension: ', self.url_extension);

      
    //   // resp_data['body']['url'] = "https://data-learn.000webhostapp.com/data-learn/2019-85700-01-Lista-de-verificacion.pdf";
    //   // console.log('resp_data[body][url]: ', resp_data['body']['url']);
    //   if (self.url_extension == 'gif' || self.url_extension == 'jpg' || self.url_extension == 'jpeg' || self.url_extension == 'png') {
    //     self.url_file_preview = self.sanitizer.bypassSecurityTrustResourceUrl(resp_data['body']['url']);
    //   } else {
    //     // self.url_file_preview = self.sanitizer.bypassSecurityTrustResourceUrl(resp_data['body']['url']);
    //     self.url_file_preview = resp_data['body']['url'];
    //   }

    //   // if (self.url_extension == 'doc' || self.url_extension == 'docx' || self.url_extension == 'xls' || self.url_extension == 'xlsx' ) {
    //   //   // src="https://docs.google.com/gview?url={{ url_file_preview }}&embedded=true"
    //   //   const file_office = 'https://docs.google.com/gview?url=' +  resp_data['body']['url'] + '&embedded=true';
    //   //   self.url_file_preview = self.sanitizer.bypassSecurityTrustResourceUrl(file_office);
    //   // } else if (self.url_extension == 'pdf' || self.url_extension == 'jpg' || self.url_extension == 'jpeg' || self.url_extension == 'png') {
    //   //   self.url_file_preview = self.sanitizer.bypassSecurityTrustResourceUrl(resp_data['body']['url']);
    //   // }

      
    //   // const url_file_preview = self.sanitizer.bypassSecurityTrustResourceUrl(resp_data['body']['url']);
    //   // console.log('url_file_preview: ', url_file_preview);
    //   console.log('self.url_file_preview: ', self.url_file_preview);
    //   self.loading_state = false;
    // });
  }

  fnGetPDFAccountingAudit(current_payload, file_guiid, callback) {
    const self = this;
    self.originQualificationService.fnHttpGetAttachedFilesOriginQualificationData(current_payload, file_guiid).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
    });
  }

  showFile(data){
    const self = this;
    // self.file_pdf_preview = blob;
    // const url = window.URL.createObjectURL(blob);

    // // i.e. display the PDF content via iframe
    // document.querySelector("iframe").src = url;

    let contentType = data.body.type;
    let blobfile = new Blob([data.body], { type: contentType });
    let url = window.URL.createObjectURL(blobfile);
    self.url_file = url
    //window.open(url, '_blank', '');
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();

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

  fnCopyText() {
    const texto = $('#content-web-format').text();

    var range = document.createRange();
    range.selectNode(document.getElementById("content-web-format"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");

    $('#content-web-format').addClass('animated bounceIn');
    setTimeout(() => {
      $('#content-web-format').removeClass('animated bounceIn')
    }, 3000);
  }

  fnCopyTextLetterFormat() {
    const texto = $('#content-text-letter-format').text();

    var range = document.createRange();
    range.selectNode(document.getElementById("content-text-letter-format"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");

    $('#content-text-letter-format').addClass('animated bounceIn');
    setTimeout(() => {
      $('#content-text-letter-format').removeClass('animated bounceIn')
    }, 3000);
  }

  fnGeneratePDF() {
    const self = this;
    var data = document.getElementById('content-text-letter-format');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Carta aceptacion E.L directa COVID sector salud ' + self.object_patient.patient_fullname.texto + ' CC ' + self.object_patient.patient_document_number.texto + ' EL ' + self.object_patient.patient_first_code.texto + ' CTO ' + self.object_patient.patient_second_code.texto + '.pdf'); // Generated PDF   
    });  
  }

  fnDownloadWordDocumentFormat() {
    const self = this;
    self.loading_state = true;
    const obj_send = {
      'fecha': (self.object_patient['patient_creation_date']['texto']) ? self.object_patient['patient_creation_date']['texto'] : null,
      'fechaCovid': (self.object_patient['patient_covid_date']['texto']) ? self.object_patient['patient_covid_date']['texto'] : null,
      'nombre': (self.object_patient['patient_fullname']['texto']) ? self.object_patient['patient_fullname']['texto'] : null,
      'correoPaciente': (self.object_patient['patient_email']['texto']) ? self.object_patient['patient_email']['texto'] : null,
      'identificacion': (self.object_patient['patient_document_number']['texto']) ? self.object_patient['patient_document_number']['texto'] : null,
      'telefono': (self.object_patient['patient_phone_number']['texto']) ? self.object_patient['patient_phone_number']['texto'] : null,
      'ciudad': (self.object_patient['patient_city']['texto']) ? self.object_patient['patient_city']['texto'] : null,
      'enfermedadLaboral': (self.object_patient['patient_first_code']['texto']) ? self.object_patient['patient_first_code']['texto'] : null,
      'contrato': (self.object_patient['patient_second_code']['texto']) ? self.object_patient['patient_second_code']['texto'] : null,
      'eps': (self.object_patient['patient_eps']['texto']) ? self.object_patient['patient_eps']['texto'] : null,
      'empresa': (self.object_patient['patient_company']['texto']) ? self.object_patient['patient_company']['texto'] : null,
      'empresaCorreo': (self.object_patient['patient_company_email']['texto']) ? self.object_patient['patient_company_email']['texto'] : null,
      'afp': (self.object_patient['patient_afp']['texto']) ? self.object_patient['patient_afp']['texto'] : null,
      'edad': (self.object_patient['patient_birth']['texto']) ? self.object_patient['patient_birth']['texto'] : null,
      'cargo': (self.object_patient['patient_position']['texto']) ? self.object_patient['patient_position']['texto'] : null,
      'tipoPrueba': (self.object_patient['patient_type_test']['texto']) ? self.object_patient['patient_type_test']['texto'] : null,
      'fechaHistoriaClinica': (self.object_patient['patient_date_clinic_history']['texto']) ? self.object_patient['patient_date_clinic_history']['texto'] : null,
    };
    self.originQualificationService.fnHttpSetDownloadWordDocumentFormat(self.current_payload, obj_send).subscribe(resp_data => {
      const file_blob = JSON.parse(JSON.stringify(resp_data.body));
      if (resp_data.status == 200) {
        self.loading_state = false;
        self.utilitiesService.showToast('top-right', 'success', 'El documento word ha descargado correctamente!');
        self.showFile(resp_data);
      }
    }, err => {
      self.loading_state = false;
      self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error! Intentlo nuevamente.');
    });

  }

  fnSaveTemporalTranscription() {
    const self = this;
    // self.loading_state = true;
    const obj_send = {
      'fecha': (self.object_patient['patient_creation_date']['texto']) ? self.object_patient['patient_creation_date']['texto'] : null,
      'fechaCovid': (self.object_patient['patient_covid_date']['texto']) ? self.object_patient['patient_covid_date']['texto'] : null,
      'nombre': (self.object_patient['patient_fullname']['texto']) ? self.object_patient['patient_fullname']['texto'] : null,
      'correoPaciente': (self.object_patient['patient_email']['texto']) ? self.object_patient['patient_email']['texto'] : null,
      'identificacion': (self.object_patient['patient_document_number']['texto']) ? self.object_patient['patient_document_number']['texto'] : null,
      'telefono': (self.object_patient['patient_phone_number']['texto']) ? self.object_patient['patient_phone_number']['texto'] : null,
      'ciudad': (self.object_patient['patient_city']['texto']) ? self.object_patient['patient_city']['texto'] : null,
      'enfermedadLaboral': (self.object_patient['patient_first_code']['texto']) ? self.object_patient['patient_first_code']['texto'] : null,
      'contrato': (self.object_patient['patient_second_code']['texto']) ? self.object_patient['patient_second_code']['texto'] : null,
      'eps': (self.object_patient['patient_eps']['texto']) ? self.object_patient['patient_eps']['texto'] : null,
      'empresa': (self.object_patient['patient_company']['texto']) ? self.object_patient['patient_company']['texto'] : null,
      'empresaCorreo': (self.object_patient['patient_company_email']['texto']) ? self.object_patient['patient_company_email']['texto'] : null,
      'afp': (self.object_patient['patient_afp']['texto']) ? self.object_patient['patient_afp']['texto'] : null,
      'edad': (self.object_patient['patient_birth']['texto']) ? self.object_patient['patient_birth']['texto'] : null,
      'cargo': (self.object_patient['patient_position']['texto']) ? self.object_patient['patient_position']['texto'] : null,
      'tipoPrueba': (self.object_patient['patient_type_test']['texto']) ? self.object_patient['patient_type_test']['texto'] : null,
      'fechaHistoriaClinica': (self.object_patient['patient_date_clinic_history']['texto']) ? self.object_patient['patient_date_clinic_history']['texto'] : null,
    };
    self.originQualificationService.fnHttpPutTemporalQualificationData(self.current_payload, obj_send, self.data_object['id']).subscribe(resp_put => {
      if (resp_put.status == 200) {
        // self.loading_state = false;
        // self.utilitiesService.showToast('top-right', 'success', 'Los datos de la transcripción se han guardado correctamente!');
      }
    }, err => {
      // self.loading_state = false;
      // this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error! Intentlo nuevamente.');
    });

  }

}
