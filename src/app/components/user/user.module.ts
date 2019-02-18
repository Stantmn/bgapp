import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PageHeaderModule } from '../../shared/modules';
import { SharedPipesModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    PageHeaderModule,
    SharedPipesModule
  ],
  declarations: [UserComponent]
})
export class UserModule {
}
