import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../classes/category';
import { Countries } from '../../constants/constants';
import { ModalComponent } from '../../shared/modules/modal/modal.component';

@Component({
  selector: 'tr[inline-product]',
  templateUrl: './inline-product.component.html',
  styleUrls: ['./inline-product.component.scss'],
  providers: [ProductService]
})
export class InlineProductComponent implements OnInit {
  @Input() product: Product;
  @Input() edit: boolean;
  @Input() categoryList: Category[];
  public _product: Product;
  // public categoryList: Category[];
  public countries: any;

  constructor(
    private productService: ProductService,
    private modal: ModalComponent,
  ) {
    this.countries = Countries;
  }

  ngOnInit() {
    this._product = this.product;
  }

  editRow(): void {
    this.edit = !this.edit;
  }
}
