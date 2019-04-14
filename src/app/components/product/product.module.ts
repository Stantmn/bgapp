import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgbdSortableHeader } from '../../shared/directives/sortable.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineProductComponent } from '../inline-product/inline-product.component';
import { PageHeaderModule } from '../../shared/modules';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, FormsModule, NgbModule, NgSelectModule, PageHeaderModule],
  declarations: [ProductComponent, NgbdSortableHeader, InlineProductComponent]
})
export class ProductModule {
}
