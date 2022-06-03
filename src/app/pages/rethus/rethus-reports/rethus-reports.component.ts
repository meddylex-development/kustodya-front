import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Input } from '@angular/core';

declare var $: any;
@Component({
  selector: 'ngx-rethus-reports',
  templateUrl: './rethus-reports.component.html',
  styleUrls: ['./rethus-reports.component.scss'],
})
export class RethusReportsComponent implements OnInit {

  @Input() group_id: any;
  @Input() report_id: any;
  @Input() name_module: any = 'Reporte e-Rethus';
  elem;
  constructor(
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
    
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    self.elem = document.getElementById('kstdy-power_bi_content');
    $(document).ready(function () {
      $('#kstdy-full_screen_icon').click(function() {
        alert('Click Full screen');
      });
    });
    /* **** END - JQuery definition **** */

    // this.group_id reporteGroupId
    // this.report_id
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
