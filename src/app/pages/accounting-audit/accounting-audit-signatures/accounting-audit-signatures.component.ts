import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { UserService } from '../../../shared/api/services/user.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-accounting-audit-signatures',
  templateUrl: './accounting-audit-signatures.component.html',
  styleUrls: ['./accounting-audit-signatures.component.scss']
})
export class AccountingAuditSignaturesComponent implements OnInit {

  data_accounting_audit: any = {};
  @Input() id_accounting_edit;
  public current_payload: string = null;
  submitted: boolean = false;
  collection_users = [{name: 18, id: 18}, {name: 1, id: 1}];
  image_source_coordinador: any = null;
  image_source_gerente: any = null;
  image_source_interventor: any = null;

  constructor(private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetInfoEncabezadoById(self.current_payload, self.id_accounting_edit);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetInfoEncabezadoById(current_payload, id_encabezado) {
    this.auditService.fnHttpGetEncabezadoById(current_payload, id_encabezado).subscribe( r => {
      if (r.status == 200) {
        this.data_accounting_audit = r.body;
        this.fnGetSignatureByUser(r.body.coordinadorId, 'image_source_coordinador');
        this.fnGetSignatureByUser(r.body.gerenteId, 'image_source_gerente');
        this.fnGetSignatureByUser(r.body.interventorId, 'image_source_interventor');
      }
    }, err => {

    });
  }


  fnGetSignatureByUser(id_user, field) {
    if(id_user != null) {
      this.auditService.fnHttpGetFirmaUsuarioId(this.current_payload, id_user).subscribe(resp_get_signature => {
        if (resp_get_signature.status == 200) {
         
         const reader = new FileReader();
          reader.readAsDataURL(resp_get_signature.body);
          reader.onload = () => {
              this[field] = this.transform(reader.result);
          };
        }
      }, err => {
      });
    }
  }

  fnEditFormSignatureAccountingAudit(data_accounting_audit) {
    this.submitted = true;
    let data_send_accounting = {
      "id": data_accounting_audit.id,
      "fechaElaboracion": data_accounting_audit.fechaElaboracion,
      "fichaTecnica": data_accounting_audit.fichaTecnica,
      "descripcionFicha": data_accounting_audit.descripcionFicha,
      "fichaTecnicaAprobada": data_accounting_audit.fichaTecnicaAprobada,
      "folios": data_accounting_audit.folios,
      "situacionEncontrada": data_accounting_audit.situacionEncontrada,
      "disposicionesLegales": data_accounting_audit.disposicionesLegales,
      "accionesRealizadas": data_accounting_audit.accionesRealizadas,
      "recomendaciones": data_accounting_audit.recomendaciones,
      "anexos": data_accounting_audit.anexos,
      "elaboradoporId": data_accounting_audit.elaboradoporId,
      "coordinadorId": data_accounting_audit.coordinadorId,
      "gerenteId": data_accounting_audit.gerenteId,
      "interventorId": data_accounting_audit.interventorId,
      "claseDocumento": data_accounting_audit.claseDocumento,
      "estado": 1,
    }
    this.auditService.fnHttpPutEncabezadoById(this.current_payload, data_send_accounting).subscribe( r => {
      if (r.status == 204) {
        this.submitted = false;
        this.fnGetInfoEncabezadoById(this.current_payload, this.id_accounting_edit);
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la depuracion con exito');
      }
    }, err => {

    });
  }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

}
