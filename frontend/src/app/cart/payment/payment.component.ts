import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {

  @Input()
  selected = '';

  @Output()
  selectedChange = new EventEmitter<string>();

  protected readonly PAYMENT_METHODS = [{
    name: 'Pix',
    icon: 'pi-money-bill',
  }, {
    name: 'Boleto Bancário',
    icon: 'pi-barcode',
  }, {
    name: 'Cartão de Crédito',
    icon: 'pi-credit-card',
  }];
}
