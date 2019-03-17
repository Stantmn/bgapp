import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    imports: [CommonModule, ProductRoutingModule, AgGridModule],
    declarations: [ProductComponent]
})
export class ProductModule {}
