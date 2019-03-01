import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { PageHeaderModule } from '../../shared/modules';
import { SharedPipesModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    NgbModule,
    FormsModule,
    PageHeaderModule,
    SharedPipesModule
  ],
  declarations: [StoreComponent]
})
export class StoreModule {
}
