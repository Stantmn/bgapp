import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../classes/product';
import { Category } from '../classes/category';

@Injectable()
export class ProductService {
  public productsList: Product[];
  private productsListSource = new Subject<Product[]>();
  public productsList$ = this.productsListSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Settings.API_ENDPOINT + `/products/product/list/`)
      .pipe(map(products => {
          return products.map((product: Product) => {
            if (!!product.category) {
              product.categoryName = `${product.category.categoryName} \\ ${product.category.subcategoryName} \\ ${product.category.subcategoryName2}`;
              product.hsCode = product.category.hsCode;
            } else {
              product.category = new Category();
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

  getProduct(_id: string): Observable<Product> {
    return this.http.get<Product>(Settings.API_ENDPOINT + '/products/product/' + _id)
      .pipe(
        map(product => {
          if (product.category) {
            product.categoryName = `${product.category.categoryName} \\ ${product.category.subcategoryName} \\ ${product.category.subcategoryName2}`;
            product.hsCode = product.category.hsCode;
          }
          return product;
        })
      );
  }

  deleteProduct(_id: string): Observable<any> {
    return this.http.delete<any>(Settings.API_ENDPOINT + '/products/product/' + _id);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(Settings.API_ENDPOINT + '/products/product/', product);
  }

  updateProduct(product: Product) {
    return this.http.put(Settings.API_ENDPOINT + '/products/product/', product);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Settings.API_ENDPOINT + `/categories/category/list/`)
      .pipe(
        map(categories => {
          return categories.map(category => {
            category.fullName = `${category.categoryName} \\ ${category.subcategoryName} \\ ${category.subcategoryName2}`;
            return category;
          });
        })
      );
  }

  refreshProducts() {
    return this.http.post(Settings.API_ENDPOINT + '/products/refresh/', {});
  }
}
