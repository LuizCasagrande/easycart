import { Product } from '../management/product/product-data';
import { User } from '../user/user-data';

export interface Order {
  id: number;
  date: Date;
  total: number;
  paymentMethod: string;
  user: User;
  products: Product[];
}
