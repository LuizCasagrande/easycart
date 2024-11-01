import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PAYMENT_METHODS, PaymentMethod} from "../cart";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {

  @Input()
  selected: any;

  @Output()
  selectedChange = new EventEmitter<PaymentMethod>();

  protected readonly PAYMENT_METHODS = PAYMENT_METHODS;
}
