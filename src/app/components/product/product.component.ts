import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Product } from '../../classes/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  public productsList: Product[];
  public columnDefs = [
    {headerName: 'ID', field: 'productId', sortable: true, filter: true},
    {headerName: 'SKU', field: 'sku', sortable: true, filter: true},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Country', field: 'countryOfManufacture'},
    {headerName: 'HS Code', field: 'hsCode', filter: true},
    {headerName: 'Category', field: 'categoryName'},
    {headerName: 'Created', field: 'created'}
  ];
  public rowData = [];

  constructor(private productService: ProductService, private userService: UserService, private modal: ModalComponent) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .pipe(map(products => {
        return products.map((product: Product) => {
          if (product.category) {
            product.categoryName = `${product.category.categoryName} \ ${product.category.subcategoryName} \ ${product.category.subcategoryName2}`;
            product.hsCode = product.category.hsCode;
          }
          product.created = new Date(product.created).toDateString();
          return product;
        });
      }))
      .subscribe(
        response => {
          this.productsList = response;
          this.rowData = this.productsList;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Products list', 0);
          console.log(error);
        }
      );
  }
}
