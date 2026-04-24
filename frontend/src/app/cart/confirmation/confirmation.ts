import { Component, Input } from '@angular/core';
import { User } from '../../user/user-data';
import { Product } from '../../management/product/product-data';
import { Card } from 'primeng/card';
import { PhonePipe } from '../../shared/pipes/phone.pipe';
import { CartProductList } from '../product-list/cart-product-list';

@Component({
  selector: 'app-confirmation',
  imports: [Card, PhonePipe, CartProductList],
  templateUrl: './confirmation.html',
})
export class Confirmation {
  @Input()
  user!: User;

  @Input()
  products!: Product[];
}
