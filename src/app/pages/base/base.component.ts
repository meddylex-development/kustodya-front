import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'ngx-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.menu-sidebar').removeClass('d-none').addClass('d-block compacted');
      // $('.menu-sidebar').removeClass('expanded').addClass('compacted');
      $('#sidebar').css('display', 'none');
    });
  }

}
