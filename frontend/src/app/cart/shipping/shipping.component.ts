import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../user/user";
import {nowPlusDays} from "../../shared/utils";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent {

  @Input()
  user!: User;

  @Input()
  selected = '';

  @Output()
  selectedChange = new EventEmitter<string>();

  protected readonly SHIPPING_METHODS = [{
    name: 'Entrega Econômica',
    date: nowPlusDays(7),
    price: 0,
  }, {
    name: 'Entrega Expressa',
    date: nowPlusDays(3),
    price: 19.53,
  }];
}
