import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAYMENT_METHODS, PaymentMethod } from '../cart-data';
import { Card } from 'primeng/card';
import { RadioButtonCard } from '../../shared/radio-button-card/radio-button-card';

@Component({
  selector: 'app-payment',
  imports: [Card, RadioButtonCard],
  templateUrl: './payment.html',
})
export class Payment {
  @Input()
  selected: any;

  @Output()
  selectedChange = new EventEmitter<PaymentMethod>();

  protected readonly paymentMethods = PAYMENT_METHODS;
}
