import { Component, Input, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../shared/api/services/admin.service';
import { UtilitiesService } from '../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-build-address',
  templateUrl: './build-address.component.html',
  styleUrls: ['./build-address.component.scss']
})
export class BuildAddressComponent implements OnInit {

  @Input() data: any;
  @Input() typeAddress: any;
  public dataSession;
  public token: any;
  public collectionCountries: any = [];
  public collectionDepartaments: any = [];
  public collectionCities: any = [];

  public collectionWayType: any = [
    { 'id': 1, 'name': 'Calle' },
    { 'id': 2, 'name': 'Carrera' },
    { 'id': 3, 'name': 'Transversal' },
    { 'id': 4, 'name': 'Diagonal' },
    { 'id': 5, 'name': 'Avenida Calle' },
    { 'id': 6, 'name': 'Avenida Carrera' },
    { 'id': 7, 'name': 'Avenida Transversal' },
    { 'id': 8, 'name': 'Avenida Diagonal' },
  ];
  public collectionLetters: any = [
    { 'id': 1, 'name': 'A' },
    { 'id': 2, 'name': 'B' },
    { 'id': 3, 'name': 'C' },
    { 'id': 4, 'name': 'D' },
    { 'id': 5, 'name': 'E' },
    { 'id': 6, 'name': 'F' },
    { 'id': 7, 'name': 'G' },
    { 'id': 8, 'name': 'H' },
    { 'id': 9, 'name': 'I' },
    { 'id': 10, 'name': 'J' },
    { 'id': 11, 'name': 'K' },
    { 'id': 12, 'name': 'L' },
    { 'id': 13, 'name': 'M' },
    { 'id': 14, 'name': 'N' },
    { 'id': 15, 'name': 'Ñ' },
    { 'id': 16, 'name': 'O' },
    { 'id': 17, 'name': 'P' },
    { 'id': 18, 'name': 'Q' },
    { 'id': 19, 'name': 'R' },
    { 'id': 20, 'name': 'S' },
    { 'id': 21, 'name': 'T' },
    { 'id': 22, 'name': 'U' },
    { 'id': 23, 'name': 'V' },
    { 'id': 24, 'name': 'W' },
    { 'id': 25, 'name': 'X' },
    { 'id': 26, 'name': 'Y' },
    { 'id': 27, 'name': 'Z' },
  ];
  public collectionBis: any = [
    { 'id': 1, 'name': 'Bis' },
  ]
  public collectionCardinalSufix: any = [
    { 'id': 1, 'name': 'Este' },
    { 'id': 2, 'name': 'Sur' },
  ]

  public userCountry: any = null;
  public userDepartament: any = null;
  public userCity: any = null;
  public userAddressWayType: any = null;
  public userAddressFirstNumber: any = null;
  public userAddressFirstLetter: any = null;
  public userAddressSufixBis: any = null;
  public userAddressSecondLetter: any = null;
  public userAddressFirstCardinalSufix: any = null;
  public userAddressSecondNumber: any = null;
  public userAddressThirdLetter: any = null;
  public userAddressThirdNumber: any = null;
  public userAddressSecondCardinalSufix: any = null;
  public userAddressPlaceCondition: any = null;

  public addressPlaceBuilded: string = '';

  public loading: boolean = false;
  public textSpinner: string = "Cargando...";
  public dataAddressBuild = {
    'userCountry': null,
    'userDepartament': null,
    'userCity': null,
    'address': '',
    'aditionalDataAddress': '',
    'postalCode': '',
    'primaryPhone': '',
    'aditionalPhone': '',
  };

  constructor(
    protected ref: NbDialogRef<BuildAddressComponent>,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private adminService: AdminService,
  ) { }

  ngOnInit() {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token["token"];
        this.dataSession = token.getPayload();

        console.log('this.data: ', this.data);
        if (this.data['dataAddress']) {
          this.dataAddressBuild = this.data['dataAddress'];
          // this.dataAddressBuild['userCountry'] = this.data['dataAddress']['userCountry'];
          // this.dataAddressBuild['userDepartament'] = this.data['dataAddress']['userDepartament'];
          // this.dataAddressBuild['userCity'] = this.data['dataAddress']['userCity'];
          // this.dataAddressBuild['address'] = this.data['dataAddress']['address'];
          // this.dataAddressBuild['aditionalDataAddress'] = this.data['dataAddress']['aditionalDataAddress'];
        } else {
          this.dataAddressBuild['address'] = this.data['direccion'] || this.data['addressPatient'];
        }

        this.fnGetDataPlace();
      }
    });

  }

  fnGetDataPlace() {
    // this.utilitiesService.fnGetCountryDataAPI().subscribe(response => {
    //   const dataCountries = JSON.parse(JSON.stringify(response['body']));
    //   let dataContry = [];
    //   // dataCountries.forEach(element => {
    //   //   dataContry.push({ 'name': element['name']['common'], 'flag': element['flags'], 'allDataCountry': element })
    //   // });
    //   dataContry = [{ id: 1, name: 'Colombia', flag: 'null', allDataCountry: {} }];
    //   this.collectionCountries = dataContry;
    //   // this.userData['diagnostic']['userCountryCondition'] = this.collectionCountries[34];
    // }, (error) => {
    // });

    // let urlApi = this.utilitiesService.fnReturnUrlApiMapDivPolColombia();
    // this.utilitiesService.fnHttpGetDataJSONAPI(urlApi).then(response => {
    //   this.collectionDepartaments = JSON.parse(JSON.stringify(response));
    // }, (error) => {
    // });

    // const data1 = this.adminService.fnHttpGetCountries(this.token);

    this.adminService.fnHttpGetCountries(this.token).subscribe((resp) => {
      if (resp['status'] == 200) {
        this.collectionCountries = resp['body'];
      }
    }, (error) => {
    });
  }
  
  fnSetUserCityCondition(item_depto) {
    // this.userData['diagnostic']['userCityCondition'] = [];
    this.collectionCities = [];
    if (item_depto['ciudades'].length > 0) {
      let dataCollectionCities = [];
      item_depto['ciudades'].forEach(element => {
        dataCollectionCities.push({ 'name': element })
      });
      this.collectionCities = dataCollectionCities;
    }

  }

  fnBuildAddress($event) {
    let addressPlaceBuilded = 
      ((this.userAddressWayType) ? this.userAddressWayType.name : '') +' '+ 
      ((this.userAddressFirstNumber) ? this.userAddressFirstNumber : '') +' '+
      ((this.userAddressFirstLetter) ? this.userAddressFirstLetter.name : '') +' '+
      ((this.userAddressSufixBis) ? this.userAddressSufixBis.name : '')  +' '+
      ((this.userAddressSecondLetter) ? this.userAddressSecondLetter.name : '')  +' '+
      ((this.userAddressFirstCardinalSufix) ? this.userAddressFirstCardinalSufix.name : '')  +' '+
      ((this.userAddressSecondNumber) ? this.userAddressSecondNumber : '') +' '+
      ((this.userAddressThirdLetter) ? this.userAddressThirdLetter.name : '')  +' '+
      ((this.userAddressThirdNumber) ? this.userAddressThirdNumber : '') +' '+
      ((this.userAddressSecondCardinalSufix) ? this.userAddressSecondCardinalSufix.name : '')  +' '+
      ((this.userAddressPlaceCondition) ? this.userAddressPlaceCondition : '' );
    this.addressPlaceBuilded = addressPlaceBuilded
  }

  fnAddAddress(dataAddressBuild) {
    this.dismiss(dataAddressBuild);
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelData() {
    // this.submitted = false;
    this.dismiss(null);
  }

  fnCloseModal() {
    this.dismiss(null);
  }

  fnSelectDeptosByIdCountry($event: Event): void {
    let idCountry = $event['IDPAIS'];
    this.dataAddressBuild['countryInfo'] = $event;
    this.adminService.fnHttpGetDeptosCountry(this.token, idCountry).subscribe((resp) => {
      if (resp['status'] == 200) {
        this.collectionDepartaments = resp['body'];
      }
    }, (error) => {
    });
  }

  fnSelectCitiesByIdDepto($event: Event): void {
    let idDepto = $event['IDDEPTO'];
    let idCountry = this.dataAddressBuild['userCountry'];
    this.dataAddressBuild['deptoInfo'] = $event;
    this.adminService.fnHttpGetCitiesDepto(this.token, idCountry, idDepto).subscribe((resp) => {
      if (resp['status'] == 200) {
        this.collectionCities = resp['body'];
      }
    }, (error) => {
    });
  }

  fnSelectPoblationsByCity($event: Event): void {
    this.dataAddressBuild['cityInfo'] = $event;
    let idCity = $event['IDMUNICIPIO'];
    let idDepto = this.dataAddressBuild['userDepartament'];
    let idCountry = this.dataAddressBuild['userCountry'];
    // this.dataAddressBuild['deptoInfo'] = $event;
    this.adminService.fnHttpGetPoblationsCity(this.token, idCountry, idDepto, idCity).subscribe((resp) => {
      if (resp['status'] == 200) {
        let idPoblation = this.dataAddressBuild['userCountry'];
        this.dataAddressBuild['poblationInfo'] = resp['body'][0];
        // this.collectionCities = resp['body'];
      }
    }, (error) => {
    });
  }

}
