import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_METHODS } from '../../cart/cart-data';

@Pipe({
  name: 'paymentMethod',
})
export class PaymentMethodPipe implements PipeTransform {
  transform(value: string): string {
    return PAYMENT_METHODS.filter((method) => method.value === value)[0].name.split(' ')[0];
  }
}
