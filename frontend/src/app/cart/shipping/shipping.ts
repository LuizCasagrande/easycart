import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user/user-data';
import { SHIPPING_METHODS, ShippingMethod } from '../cart-data';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { RadioButtonCard } from '../../shared/radio-button-card/radio-button-card';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-shipping',
  imports: [Card, Button, RouterLink, RadioButtonCard, NgClass, DatePipe, CurrencyPipe],
  templateUrl: './shipping.html',
})
export class Shipping {
  @Input()
  user!: User;

  @Input()
  selected: any;

  @Output()
  selectedChange = new EventEmitter<ShippingMethod>();

  protected readonly shippingMethods = SHIPPING_METHODS;
}
