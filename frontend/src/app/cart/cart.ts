import {User} from "../user/user";
import {Product} from "../management/product/product";

export class Cart {

  user!: User;
  products: Product[] = [];
  shippingMethod = 'Entrega Econômica';
  paymentMethod = 'Pix';
}
