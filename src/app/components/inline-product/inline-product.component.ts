import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() deleted = new EventEmitter<boolean>();
  public _product: Product;
  public countries: any;

  constructor(
    private productService: ProductService,
    private modal: ModalComponent
  ) {
    this.countries = Countries;
    this._product = new Product();
  }

  ngOnInit() {
    this._product = Object.assign(this.product);
  }

  editRow(): void {
    this.edit = !this.edit;
  }

  saveProduct(): void {
    this.productService.updateProduct(this._product)
      .subscribe(
        () => {
          this.getProduct(this._product._id);
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t save the product information', 0);
          console.log(error);
        },
        () => {
          this.editRow();
        }
      );
  }

  deleteProduct(): void {
    this.modal.openMessage('Do you want to delete this products?', 'You can\' restore this product again', 1)
      .then(result => {
        if (result) {
          this.productService.deleteProduct(this._product._id)
            .subscribe(
              () => {
                this.deleted.emit(true);
              },
              error => {
                this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t delete the product', 0);
                console.log(error);
              },
            );
        }
      })
      .catch(error => {
        console.log(error);
      });

  }

  addProduct(): void {
    console.log(this._product);
    this.productService.addProduct(this._product)
      .subscribe(
        () => {
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t save the product information', 0);
          console.log(error);
        },
        () => {
          this.editRow();
          this.product = Object.assign(this._product);
        }
      );
  }

  getProduct(_id: string): void {
    this.productService.getProduct(_id)
      .subscribe(
        response => {
          this.product = response;
          this._product = response;
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t get the product information', 0);
          console.log(error);
        }
      );
  }

  cancel(): void {
    this._product = Object.assign(this.product);
    this.edit = !this.edit;
  }
}
