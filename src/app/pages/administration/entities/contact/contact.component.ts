import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-contact-entity',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactEntityComponent implements OnInit {

  @Input() data_user: any;
  @Input() dataEntityTab: any;
  step_phone: boolean = true;
  step_address: boolean = false;
  step_email: boolean = false;
  step_social_net: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
