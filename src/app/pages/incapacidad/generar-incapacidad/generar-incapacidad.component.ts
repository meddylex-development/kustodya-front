import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { resolve } from 'url';
declare var $: any;

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@Component({
  selector: 'ngx-generar-incapacidad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generar-incapacidad.component.html',
  styleUrls: ['./generar-incapacidad.component.scss']
})
export class GenerarIncapacidadComponent implements OnInit {

  public patientData: any = null;
  public patientIncapacities: any = null;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;
  public token: any;
  public listCantidadDiagnoticosIncapacidad: any;
  public collectionAttentionTypes: any = [];
  public collectionIncapacityType: any = [];
  public collectionPatientSigns: any = [];
  public collectionPatientSymptoms: any = [];
  public collectionPatientDiagnostics: any = [];
  public patientTimeStartCondition: any = { 'hour': 13, 'minute': 30 };
  public meridian: boolean = true;

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private bsLocaleService: BsLocaleService,
  ) {
  }
  
  ngOnInit() {
    const token = sessionStorage.getItem('payload');
    this.token = token;
    this.bsLocaleService.use('es');
    let data = this.utilitiesService.fnGetDataShare();
    if (data) {
      this.patientData = data['patientData'];
      this.patientData['diagnostic'] = {
        'soatInsurance': false,
        'timeStartPatientCondition': { 'hour': 12, 'minute': 0 },
      };
      console.log('this.patientData: ', this.patientData);
      this.patientIncapacities = data['patientIncapacities'];
      this.totalItems = data['patientIncapacities'].length;
      this.fnGetIncapacityAttentionTypes(this.token);
      this.fnGetIncapacityType(this.token);
      this.fnGetCie10(this.token, 3).then(response1 => {
        console.log('response1: ', response1);
        this.collectionPatientSigns = response1;
        console.log('this.collectionPatientSigns: ', this.collectionPatientSigns);
        return this.fnGetCie10(this.token, 2);
      }).then(response2 => {
        console.log('response2: ', response2);
        this.collectionPatientSymptoms = response2;
        console.log('this.collectionPatientSymptoms: ', this.collectionPatientSymptoms);
        return this.fnGetCie10(this.token, 1);
      }).then(response3 => {
        console.log('response3: ', response3);
        this.collectionPatientDiagnostics = response3;
        console.log('this.collectionPatientDiagnostics: ', this.collectionPatientDiagnostics);
      });
      
      // Promise.all([this.fnGetCie10(this.token, 3), this.fnGetCie10(this.token, 2), this.fnGetCie10(this.token, 1)]).then(response => {
      //   console.log('response Promise.all: ', response);
      // });
    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/incapadades/home');
    }
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    console.log('this.flipped: ', this.flipped);
    this.flipped = (this.flipped) ? false : true;
  }

  fnViewDagnosticCertificate(item) {
    let diagnosticCodeDNI = item['uiCodigoDiagnostico'];
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/certificado/'+ diagnosticCodeDNI);
  }

  fnShowContent(nameClass) {
    console.log('test');
    $('.' + nameClass).slideToggle();
  }

  fnGetIncapacityAttentionTypes(token) {
    // this.submitted = true;
    this.incapacityService.fnHttpGetListIncapacityAttentionTypes(token).subscribe(r => {
      this.collectionAttentionTypes = JSON.parse(JSON.stringify(r.body));
      console.log('this.collectionAttentionTypes: ', this.collectionAttentionTypes);
      // this.submitted = false;
    }, err => {
      console.log('err: ', err);
      this.utilitiesService.showToast('bottom-right', 'danger', err, 'nb-alert');
      // this.submitted = false;
    });
  }

  fnGetIncapacityType(token) {
    // this.submitted = true;
    this.incapacityService.fnHttpGetOrigenesIncapacidad(token).subscribe((result) => {
      // this.submitted = false;
      if (result.status == 200) {
        this.collectionIncapacityType = JSON.parse(JSON.stringify(result.body));
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.collectionIncapacityType.unshift(new_item);
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los origenes de incapacidad', 'nb-alert');
      }
      // this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      // this.submitted = false;
    });
  }

  fnGetCie10(token, typeCie10) {
    // this.errors = [];
    // this.submitted = true;
    return new Promise ((resolve, reject) => {
      this.incapacityService.fnHttpGetCie10(token, typeCie10).subscribe((result) => {
        // this.submitted = false;
        if (result.status == 200) {
          let collectionList = JSON.parse(JSON.stringify(result.body));
          // let new_item: any = { iIdcie10: -1, tFullDescripcion: '' };
          // this.list_Cie10.unshift(new_item);
          // this.collection_cie_10[type_cie10 - 1] = result.body;
          resolve(collectionList);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
          reject(false);
        }
        // this.submitted = false;
      }, error => {
        this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        reject(error);
        // this.submitted = false;
      });
    })
  }

  fnRemovePatientSign(item, index, collectionPatientSigns) {
    console.log('item: ', item);
    console.log('index: ', index);
    console.log('collectionPatientSigns: ', collectionPatientSigns);
    let collection = [];
    collectionPatientSigns.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    console.log('collection: ', collection);
    this.patientData['diagnostic']['patientSigns'] = collection;
    console.log('this.patientData.diagnostic: ', this.patientData.diagnostic);
  }

  fnRemovePatientSymptom(item, index, collectionPatientSymptoms) {
    console.log('item: ', item);
    console.log('index: ', index);
    console.log('collectionPatientSymptoms: ', collectionPatientSymptoms);
    let collection = [];
    collectionPatientSymptoms.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    console.log('collection: ', collection);
    this.patientData['diagnostic']['patientSymptoms'] = collection;
    console.log('this.patientData.diagnostic: ', this.patientData.diagnostic);
  }

  fnRemovePatientDiagnostic(item, index, collectionPatientDiagnostic) {
    console.log('item: ', item);
    console.log('index: ', index);
    console.log('collectionPatientDiagnostic: ', collectionPatientDiagnostic);
    let collection = [];
    collectionPatientDiagnostic.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    console.log('collection: ', collection);
    this.patientData['diagnostic']['patientDiagnostic'] = collection;
    console.log('this.patientData.diagnostic: ', this.patientData.diagnostic);
  }

  

}
