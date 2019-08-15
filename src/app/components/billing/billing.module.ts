import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { PageHeaderModule } from '../../shared/modules';
import { SharedPipesModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    BillingRoutingModule,
    NgbModule,
    FormsModule,
    PageHeaderModule,
    SharedPipesModule
  ],
  declarations: [BillingComponent]
})
export class BillingModule {
}
