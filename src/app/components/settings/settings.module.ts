import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared/modules';
import { ShippingRateComponent } from '../shipping-rate/shipping-rate.component';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule, FormsModule, NgbModule, NgSelectModule, PageHeaderModule],
  declarations: [SettingsComponent, ShippingRateComponent]
})
export class SettingsModule {
}
