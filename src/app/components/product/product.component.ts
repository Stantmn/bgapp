import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { Product } from '../../classes/product';
import { Category } from '../../classes/category';
import { Countries } from '../../constants/constants';
import { NgbdSortableHeader } from '../../shared/directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class ProductComponent implements OnInit {
  public productsList: Product[];
  public _productsList: Product[];
  public product: Product;
  public categoryList: Category[];
  public filter: string;
  public page = 1;
  public pageSize = 25;
  public collectionSize: number;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private modal: ModalComponent,
  ) {
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this._productsList = this.productsList;
    } else {
      this._productsList = [...this._productsList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getProducts(): void {
    this.productService.getProducts()
      .pipe(map(products => {
        return products.map((product: Product) => {
          if (product.category) {
            product.categoryName = `${product.category.categoryName} \\ ${product.category.subcategoryName} \\ ${product.category.subcategoryName2}`;
            product.hsCode = product.category.hsCode;
          }
          return product;
        });
      }))
      .subscribe(
        response => {
          this.productsList = response;
          this._productsList = this.productsList;
          this.collectionSize = this._productsList.length;
          this.getPage();
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Products list', 0);
          console.log(error);
        }
      );
  }

  getPage(): void {
    this._productsList = this.productsList
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  changePage(page: number): void {
    this.page = page;
    this.getPage();
  }

  search(): void {
    this._productsList = this.productsList.filter(product => {
      const term = this.filter.toLowerCase();
      return product.description.toLowerCase().includes(term)
        || (product.productId).toString().includes(term)
        || product.sku.toLowerCase().includes(term)
        || product.countryOfManufacture.toLowerCase().includes(term)
        || product.hsCode.toLowerCase().includes(term)
        || product.categoryName.toLowerCase().includes(term)
        || (product.description).includes(term);
    });
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        response => {
          this.categoryList = response;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get the Products list', 0);
          console.log(error);
        }
      );
  }
}

