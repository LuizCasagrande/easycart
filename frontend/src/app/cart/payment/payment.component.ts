import {Component} from '@angular/core';
import {CartPaymentMethod} from "../cart-payment-method";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {

  protected readonly CART_PAYMENT_METHOD = CartPaymentMethod;
  protected paymentMethods: CartPaymentMethod[] = Object.values(CartPaymentMethod);
  protected selectedPaymentMethod = CartPaymentMethod.PIX;
}
