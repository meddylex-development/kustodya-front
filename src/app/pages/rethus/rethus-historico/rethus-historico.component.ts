import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { BulkUploadService } from '../../../shared/api/services/bulk-upload.service';
import { UserService } from '../../../shared/api/services/user.service';
import { RethusService } from '../../../shared/api/services/rethus.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { interval } from 'rxjs';

declare var $: any;
@Component({
    selector: 'ngx-rethus-historico',
    templateUrl: './rethus-historico.component.html',
    styleUrls: ['./rethus-historico.component.scss'],
})
export class RethusHistoricoComponent implements OnInit, OnDestroy {
    numItemsPage: any = 10;
    currentPage: any = 1;
    totalItems: any = 0;
    search_input: any = '';
    collection_history_files = [];
    collection_history_files_original = [];
    data_service: any = null;
    state_loading: boolean = false;
    text_loading: string = '';
    token: any = null;
    long_polling_list: any = null;
    prevPage: any = null;
    nextNext: any = null;
    
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public utilitiesService: UtilitiesService,
    public rethusService: RethusService,
    public parameterizationService: ParameterizationService,
    public bulkUploadService: BulkUploadService,
    public userService: UserService,
  ) { }

    ngOnInit() {
        /* *** START - JQuery definition *** */
        // JQuery ready
        const self = this;
        $(document).ready(function () {
        //   $('[data-toggle="tooltip"]').tooltip();
        //   $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
        //   $('.menu-sidebar').removeClass('d-block').addClass('d-none');
        //   $('#toggle-settings').removeClass('was-expanded').addClass('was-collapse'); // Hide right sidebar to this component
        //   $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
        });
        /* **** END - JQuery definition **** */

        self.route.params.subscribe(params => {
            if (params.token && params.entity) {
                self.token = params.token;
                self.currentPage = 1;
                self.numItemsPage = 10;

                self.userService.fnHttpSetAuditUser(self.token, { 'descripcion': 'Ingreso a modulo Historico de cargues masivos - e-Rethus', 'accion': 2 }).subscribe(resp => {
                });

                self.fnGetReportHistoryRethus(self.token, self.currentPage);

                self.long_polling_list = setInterval(function tick() {
                    self.fnGetReportHistoryRethus(self.token, self.currentPage);
                    // if (self.state_loading) {
                    // } else {
                    //     if (self.data_service['statusQueryGetUri']) {
                    //         self.fnGetReportByUrl(self.data_service['statusQueryGetUri']);
                    //     }
                    // }
                }, 180000);

                // interval(120000).subscribe(x => {
                //     self.fnGetReportHistoryRethus(self.currentPage);
                // });
            } else {
                self.router.navigateByUrl('');
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.long_polling_list);
    }

    fnGetReportHistoryRethus(token, currentPage) {
        // Instancia de conexion servicio
        this.state_loading = true;
        this.text_loading = 'Cargando';
        this.bulkUploadService.fnHttpGetListFilesUploadedRethus(token, currentPage).subscribe(response => {
            console.log('response: ', response);
            if(response.status == 200) {

                this.collection_history_files = JSON.parse(JSON.stringify(response.body['cargueOutputModels']));
                this.collection_history_files_original = JSON.parse(JSON.stringify(response.body['cargueOutputModels']));
                this.totalItems = response.body['paginacion']['totalItems'];
                this.numItemsPage = response.body['paginacion']['itemsPorPagina'];
                this.currentPage = response.body['paginacion']['paginaActual'];
                this.prevPage = response.body['paginacion']['anterior'];
                this.nextNext = response.body['paginacion']['siguiente'];

                // this.collection_history_files = response.body;
                this.state_loading = false;
                this.text_loading = '';
                // this.totalItems = this.collection_history_files.length;
            } else {
                // this.data_service = response.body;
                this.state_loading = false;
                this.text_loading = '';
                // this.totalItems = this.collection_history_files.length;
            }
        }, err => {
            // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
        });
    }

    fnGetReportByUrl(url_api) {
        // Instancia de conexion servicio
        this.state_loading = true;
        this.text_loading = 'Cargando';
        this.bulkUploadService.fnHttpGetListFilesUploadedRethusByUrl(this.token, url_api).subscribe(r => {
            if(r.status == 200) {
                this.collection_history_files = r.body['output'];
                this.state_loading = false;
                this.text_loading = '';
            } else {
                this.state_loading = false;
                this.text_loading = '';
            }
        }, err => {
            // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
        });
    }

    fnShowReport(data) {
        console.log('data: ', data);
        if (data.estado == 'Terminado') {
            $('#kstdy-report').click();
        }
    }

    fnDownloadReportFile(data, index) {
        console.log('data: ', data);
        console.log('index: ', index);
        const self = this;
        self.state_loading = true;
        self.text_loading = 'Descargando archivo';
        if (data['taskId']) {
            self.rethusService.fnHttpGetFileDownloadRethusHistory(data['taskId'], true, self.token).subscribe(resp_export => {
                console.log('resp_export: ', resp_export);
                if (resp_export.status == 200) {
                    var blob = new Blob([resp_export.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveBlob(blob);
                        self.state_loading = false;
                        self.text_loading = '';
                    } else {
                        var downloadLink = window.document.createElement('a');
                        downloadLink.href = window.URL.createObjectURL(blob);
                        downloadLink.download = 'Archivo_reporte_rethus.xlsx';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        self.state_loading = false;
                        self.text_loading = '';
                    }
                }
            }, err => {
                self.state_loading = false;
                self.text_loading = '';
                self.utilitiesService.showToast('top-right', 'danger', 'Es posible que el archivo no este disponible.');
            });
        } else {
            self.state_loading = false;
            self.text_loading = '';
            self.utilitiesService.showToast('top-right', 'danger', 'Es posible que el archivo no este disponible.');
        }
    }

    getPage(page: number) {
        const self = this;
        self.currentPage = page;
        self.fnGetReportHistoryRethus(self.token, self.currentPage);
    }
}
