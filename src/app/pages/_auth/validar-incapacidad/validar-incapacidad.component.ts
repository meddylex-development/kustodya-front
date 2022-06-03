import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-validar-incapacidad',
  templateUrl: './validar-incapacidad.component.html',
  styleUrls: ['./validar-incapacidad.component.scss']
})
export class ValidarIncapacidadComponent implements OnInit {

  public guidCode;
  public fechaInicio;
  public fechaFin;
  public diasIncapacidad;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['guidcode'] && params['fechaInicio'] && params['fechaFin'] && params['diasIncapacidad']) {
        this.guidCode = params['guidcode'];
        this.fechaInicio = params['fechaInicio'];
        this.fechaFin = params['fechaFin'];
        this.diasIncapacidad = params['diasIncapacidad'];
      }
    });
  }

}
