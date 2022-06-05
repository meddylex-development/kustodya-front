/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Url: http://kustodya-medicos-develop.azurewebsites.net/
// code: RxISAV5cGIsgoxRc12jma4e3rdaWqFcJzQIw2Mji7mjV2upwMBkCxg==

export const environment = {
  production: false,
  // apiUrl: 'http://meddylex-001-site1.itempurl.com', 
  apiUrl: 'https://localhost:5001', 
  apiUrlSite4: 'http://meddylex-001-site4.itempurl.com', 
  // apiUrlMiddlewareMails: 'http://localhost:3001',
  apiUrlMiddlewareMails: 'https://kustodya.herokuapp.com',
  apiMedicos: 'https://kustodya-medicos-develop.azurewebsites.net',
  codigoApiMedicos: 'RxISAV5cGIsgoxRc12jma4e3rdaWqFcJzQIw2Mji7mjV2upwMBkCxg==',
  codigoApiMedico: 'RxISAV5cGIsgoxRc12jma4e3rdaWqFcJzQIw2Mji7mjV2upwMBkCxg==',
  // siteUrl: 'http://meddylex-001-site1.itempurl.com',
  siteUrl: 'https://localhost:5001',
  timeExpireReport: 60000,
  reportsUrl: 'https://kustodya-reportes-develop.azurewebsites.net',
  codigoApiReports: '4wPaGc0TSFqxWiDQWFvtrjBeV4VG9ob2ZE12fQTWF6uhWIgdO7Z2ow==',
  urlApiMapDivPolColombia: 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
};
