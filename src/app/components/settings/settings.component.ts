import { Component, OnInit } from '@angular/core';
import { ShippingRate } from '../../classes/shipping-rate';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  rates: ShippingRate[];
  storeId: string = null;
  constructor() { }

  ngOnInit() {
  }

}
