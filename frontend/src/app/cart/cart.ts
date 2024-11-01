import {User} from "../user/user";
import {Product} from "../management/product/product";
import {nowPlusDays} from "../shared/utils";

export const SHIPPING_METHODS = [
  {name: 'Entrega Econômica', date: nowPlusDays(7), price: 0},
  {name: 'Entrega Expressa', date: nowPlusDays(3), price: 19.53},
];

export const PAYMENT_METHODS = [
  {name: 'Pix', icon: 'pi-money-bill'},
  {name: 'Boleto Bancário', icon: 'pi-barcode'},
  {name: 'Cartão de Crédito', icon: 'pi-credit-card'},
];

export class Cart {
  user!: User;
  products: Product[] = [];
  shippingMethod: ShippingMethod = SHIPPING_METHODS[0];
  paymentMethod: PaymentMethod = PAYMENT_METHODS[0];
}

export class ShippingMethod {
  name!: string;
  date!: Date;
  price!: number;
}

export class PaymentMethod {
  name!: string;
  icon!: string;
}
