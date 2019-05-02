import {
  Component,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Product } from '../../classes/product';
import { Category } from '../../classes/category';
import { Countries } from '../../constants/constants';
import { NgbdSortableHeader } from '../../shared/directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService, DecimalPipe]
})
export class ProductComponent implements OnDestroy {
  public productsList: Product[];
  public _productsList: Product[];
  private productsListForXLS: {};
  public product: Product;
  public categoryList: Category[];
  public filter: string;
  public page = 1;
  public pageSize = 25;
  public collectionSize: number;
  public subscriptionProducts: Subscription;
  public editForm = false;
  public publishedStatus: boolean = null;
  public dateFrom: {};
  public dateTo: {};
  public showFormFlag = false;
  public countries: any;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private modal: ModalComponent,
  ) {
    this.productCancel();
    this.countries = Countries;
    this.getProducts();
    this.getCategories();
    this.subscriptionProducts = this.productService.productsList$
      .subscribe(products => {
        this.productsList = products;
        this._productsList = this.productsList;
        this.collectionSize = this._productsList.length;
        this.getPage();
      });
  }

  ngOnDestroy() {
    this.subscriptionProducts.unsubscribe();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        () => {
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t get a list of products', 0);
          console.log(error);
        }
      );
  }

  convertProductListToXLS(): any {
    return this.productsListForXLS = this.productsList.map(product => {
      const xlsRow = {};
      xlsRow['Product ID'] = product.productId;
      xlsRow['Variant ID'] = product.variantId;
      xlsRow['Barcode'] = product.barcode;
      xlsRow['SKU'] = product.sku;
      xlsRow['Country of Origin'] = product.countryOfManufacture;
      xlsRow['HS Code'] = product.hsCode;
      xlsRow['Weight'] = product.weight;
      xlsRow['Weight Unit'] = product.weightUnit;
      xlsRow['Created'] = product.created;
      xlsRow['Updated'] = product.updated;
      xlsRow['Published'] = product.published;
      xlsRow['Description'] = product.description;
      xlsRow['Categorization'] = product.productType;
      xlsRow['Collection ID'] = product.collectionId;
      xlsRow['Declared Value'] = product.declaredValue;
      return xlsRow;
    });
  }

  exportProductsToXLS(): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.convertProductListToXLS());
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'products.xlsx');
    this.productsListForXLS = {};
  }

  refreshProducts(): void {
    this.modal.openMessage('Reload all products?', 'Reload it means you will loose categories, HS codes and countries', 1)
      .then(result => {
        if (result) {
          this.productService.refreshProducts()
            .subscribe(
              () => {
                this.getProducts();
              },
              error => {
                this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t load a list of products', 0);
                console.log(error);
              }
            );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProduct(deleted: boolean): void {
    this.getProducts();
  }

  onSort({column, direction}: SortEvent) {
    this.filterList();
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this._productsList = [...this._productsList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  createdDateChange(): void {
    if (this.dateFrom && !this.dateTo) {
      this._productsList = this._productsList.filter(
        product => new Date(product.created) >= new Date(this.formatDate(this.dateFrom))
      );
    } else if (this.dateTo && !this.dateFrom) {
      this._productsList = this._productsList.filter(
        product => new Date(product.created) <= new Date(this.formatDate(this.dateTo))
      );
    } else if (this.dateTo && this.dateFrom) {
      this._productsList = this._productsList.filter(
        product => (new Date(product.created) <= new Date(this.formatDate(this.dateTo))) &&
          (new Date(product.created) >= new Date(this.formatDate(this.dateFrom)))
      );
    }
  }

  formatDate(date: any): string {
    let stringDate = '';
    if (date) {
      stringDate += date.year + '-';
      stringDate += (parseInt(date.month, 10) < 10 ? '0' + parseInt(date.month, 10) : parseInt(date.month, 10)) + '-';
      stringDate += parseInt(date.day, 10) < 10 ? '0' + parseInt(date.day, 10) : parseInt(date.day, 10);
    }
    return stringDate;
  }

  filterList(): void {
    this._productsList = this.productsList;
    this.search();
    this.publishedStatusChange();
    this.createdDateChange();
    this.collectionSize = this._productsList.length;
    this.getPage();
  }

  publishedStatusChange(): void {
    if (this.publishedStatus === true && this.publishedStatus !== null) {
      this._productsList = this._productsList.filter(product => product.publishedStatus);
    } else if (this.publishedStatus === false && this.publishedStatus !== null) {
      this._productsList = this._productsList.filter(product => !product.publishedStatus);
    }
  }

  getPage(): void {
    this._productsList = this._productsList
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  changePage(page: number): void {
    this.page = page;
    this.filterList();
  }

  search(): void {
    if (this.filter) {
      this._productsList = this._productsList.filter(product => {
        const term = this.filter.toLowerCase();
        return product.description.toLowerCase().includes(term)
          || (product.productId).toString().includes(term)
          || (!!product.sku ? product.sku.toLowerCase().includes(term) : false)
          || (!!product.countryOfManufacture ? product.countryOfManufacture.toLowerCase().includes(term) : false)
          || (!!product.hsCode ? product.hsCode.toLowerCase().includes(term) : false)
          || (!!product.categoryName ? product.categoryName.toLowerCase().includes(term) : false)
          || (product.description).includes(term);
      });
    }
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        response => {
          this.categoryList = response;
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t get the categories list', 0);
          console.log(error);
        }
      );
  }

  productSave(): void {
    this.productService.addProduct(this.product)
      .subscribe(
        response => {
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t save the product information', 0);
          console.log(error);
        },
        () => {
          this.getProducts();
          this.productCancel();
        }
      );
  }

  productCancel(): void {
    this.product = new Product();
    this.product.category = new Category();
    this.showFormFlag = false;
  }

  showForm(flag: boolean): void {
    this.showFormFlag = flag;
  }

}

