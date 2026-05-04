import { Product } from '../management/product/product-data';

export interface Order {
  id: number;
  date: Date;
  total: number;
  paymentMethod: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  quantity: number;
  product: Product;
}
