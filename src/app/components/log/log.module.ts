import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component';
import { PageHeaderModule } from '../../shared/modules';
import { SharedPipesModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    NgbModule,
    FormsModule,
    PageHeaderModule,
    SharedPipesModule
  ],
  declarations: [LogComponent]
})
export class LogModule {
}
