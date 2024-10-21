import {Component} from '@angular/core';
import {CartPaymentMethod} from "../cart-payment-method";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {

  protected selected = CartPaymentMethod.PIX;
  protected readonly CART_PAYMENT_METHOD = CartPaymentMethod;
  protected readonly PAYMENT_METHODS = Object.values(CartPaymentMethod);

  constructor(private readonly cartService: CartService) {
    this.cartService.payment$.subscribe(r => this.selected = r);
  }

  protected onSelect(value: string): void {
    this.cartService.payment$.next(<CartPaymentMethod>value);
  }
}
