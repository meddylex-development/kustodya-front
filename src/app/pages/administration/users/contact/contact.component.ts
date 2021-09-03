import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  @Input() data_user: any;
  step_phone: boolean = true;
  step_address: boolean = false;
  step_email: boolean = false;
  step_social_net: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
