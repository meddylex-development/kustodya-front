import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {

  numItemsPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 14;
  itemsPerPage: number = 10;
  submitted: boolean = false;
  list_entities: any = [
    {'id': 1, 'nombre': 'SuperAdministrador'},
    {'id': 2, 'nombre': 'Administrador'},
    {'id': 3, 'nombre': 'Consulta General'},
    {'id': 4, 'nombre': 'Médico'},
    {'id': 5, 'nombre': 'Reportes'},
    {'id': 6, 'nombre': 'Consultor'}];
  search_input: string = '';

  constructor() { }

  ngOnInit() {
  }


  fnFilter(text_search) {

  }

}
