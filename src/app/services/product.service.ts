import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../classes/product';
import { Category } from '../classes/category';

@Injectable()
export class ProductService {
  public categoryList: Category[];
  public productsList: Product[];
  private productsListSource = new Subject<Product[]>();
  public productsList$ = this.productsListSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Settings.API_ENDPOINT + `/products/product/list/`)
      .pipe(map(products => {
          return products.map((product: Product) => {
            if (product.category) {
              product.categoryName = `${product.category.categoryName} \\ ${product.category.subcategoryName} \\ ${product.category.subcategoryName2}`;
              product.hsCode = product.category.hsCode;
            }
            return product;
          });
        }),
        tap(products => {
          this.productsList = products;
          this.productsListSource.next(products);
        })
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Settings.API_ENDPOINT + `/categories/category/list/`)
      .pipe(tap(categories => this.categoryList = categories));
  }

  refreshProducts(): void {
    this.productsListSource.next(this.productsList);
  }
}
