import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/api/services/user.service';
declare var $: any;
@Component({
  selector: 'ngx-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss'],
})
export class UserTabsComponent implements OnInit {

  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_entity: boolean = false;
  content_tab_signature: boolean = false;
  token: any = null;
  data_user: any = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
  ) { }

  

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;

    $(document).ready(function () {
      $('#kstdy-breadcrumbs').css('display', 'none'); // Emulate click display right sidebar to hide
      // $('#kstdy-title_module').text('Mi perfil'); // Emulate click display right sidebar to hide
      // $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
      // $('.menu-sidebar').removeClass('d-block').addClass('d-none');
      // $('#toggle-settings').removeClass('was-expanded').addClass('was-collapse'); // Hide right sidebar to this component
      // $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        const user_id = sessionStorage.getItem('user_id');
        if (user_id) {
          self.fnGetDataUserById(self.token, user_id);
        } else {
          self.router.navigateByUrl('');
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('#kstdy-breadcrumbs').css('display', 'block');
  }

  fnGetDataUserById(token, user_id) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataUserById(token, user_id).subscribe(response => {
      if (response.status == 200) {
        this.data_user = response['body'];
      } else {
        this.data_user = response['body'];
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

}
