import {Component, Input} from '@angular/core';
import {User} from "../../user/user";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent {

  @Input()
  user!: User;

  protected selectedShippingMethod!: string;

  protected shippingMethods: ShippingMethod[] = [
    {
      name: 'Entrega Econômica',
      date: this.getNowPlusDays(7),
      price: 'Grátis',
    },
    {
      name: 'Entrega Expressa',
      date: this.getNowPlusDays(3),
      price: '19.53',
    },
  ];

  constructor() {
    this.selectedShippingMethod = this.shippingMethods[0].name;
  }

  getNowPlusDays(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value));
  }
}

export interface ShippingMethod {
  name: string;
  date: Date;
  price: string;
}
