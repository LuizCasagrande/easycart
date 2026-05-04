import { User } from '../user/user-data';
import { Product } from '../management/product/product-data';
import { nowPlusDays } from '../shared/utils';

export const ORDER_STEPS = [
  { label: 'Carrinho' },
  { label: 'Entrega' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
];

export const FINAL_STEP = 4;

export const SHIPPING_METHODS = [
  { name: 'Entrega Econômica', date: nowPlusDays(7), price: 0 },
  { name: 'Entrega Expressa', date: nowPlusDays(3), price: 19.53 },
];

export const PAYMENT_METHODS = [
  { name: 'Pix', icon: 'pi-money-bill', enumValue: 'PIX' },
  { name: 'Boleto Bancário', icon: 'pi-barcode', enumValue: 'BANK_SLIP' },
  { name: 'Cartão de Crédito', icon: 'pi-credit-card', enumValue: 'CREDIT_CARD' },
];

export class CartDto {
  user!: User;
  products: Product[] = [];
  shippingMethod: ShippingMethod = SHIPPING_METHODS[0];
  paymentMethod: PaymentMethod = PAYMENT_METHODS[0];
}

export interface ShippingMethod {
  name: string;
  date: Date;
  price: number;
}

export interface PaymentMethod {
  name: string;
  icon: string;
  enumValue: string;
}
