import { Category } from './category';

export class Product {
  _id: string;
  productId: number;
  sku: string;
  description: string;
  category: Category;
  countryOfManufacture: string;
  hsCode: string;
  categoryName: string;
  publishedStatus: boolean;
  created: string;
}
