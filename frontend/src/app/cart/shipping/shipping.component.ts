import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../user/user";
import {SHIPPING_METHODS, ShippingMethod} from "../cart";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent {

  @Input()
  user!: User;

  @Input()
  selected: any;

  @Output()
  selectedChange = new EventEmitter<ShippingMethod>();

  protected readonly SHIPPING_METHODS = SHIPPING_METHODS;
}
