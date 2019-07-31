import { Category } from './category';

export class Product {
  _id: string;
  productId: number;
  variantId: number;
  barcode: string;
  sku: string;
  description: string;
  weight: number;
  weightUnit: string;
  productType: string;
  collectionId: number;
  declaredValue: number;
  category: Category;
  countryOfManufacture: string;
  hsCode: string;
  categoryName: string;
  publishedStatus: boolean;
  created: string;
  updated: string;
  published: string;
}

export interface TableConfig {
  productId: boolean;
  variantId: boolean;
  sku: boolean;
  description: boolean;
  country: boolean;
  hsCode: boolean;
  category: boolean;
  created: boolean;
}

