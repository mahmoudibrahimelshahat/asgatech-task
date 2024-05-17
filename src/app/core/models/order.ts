export interface Product {
  ProductId: number;
  Quantity: number;
}

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: Product[];
  PaymentType: string;
}