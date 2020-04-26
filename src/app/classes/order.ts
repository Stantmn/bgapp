export class Order {
  _id: string;
  shopifyOrderId: number;
  orderName: string;
  orderNumber: string;
  shippingRate: number;
  orderIdentifier: string;
  shipmentIdentifier: string;
  apiKeyBorderGuru: string;
  customer: string;
  shipping: string;
  created: string;
  cursor: string;
}

export interface OrderResponse {
orders: Order[];
pageInfo: { hasPreviousPage: boolean, hasNextPage: boolean };
}
