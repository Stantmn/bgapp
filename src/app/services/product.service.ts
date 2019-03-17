import { Injectable } from '@angular/core';
import { Settings } from '../constants/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { Category } from '../classes/category';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Settings.API_ENDPOINT + `/products/product/list/`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Settings.API_ENDPOINT + `/categories/category/list/`);
  }
}
