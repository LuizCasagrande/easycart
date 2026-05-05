import { Component, model } from '@angular/core';
import { CartProductList } from '../cart/cart-product-list/cart-product-list';
import { OrderService } from './order.service';
import { EasyCartService } from '../shared/easy-cart.service';
import { Order } from './order-data';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { HeaderActions } from '../shared/header-actions/header-actions';
import { RouterLink } from '@angular/router';
import { PhonePipe } from '../shared/pipes/phone.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [CartProductList, Card, Button, HeaderActions, RouterLink, PhonePipe, CurrencyPipe],
  templateUrl: './order-detail.html',
})
export class OrderDetail {
  protected order = model<Order | null>(null);

  constructor(
    protected easyCartService: EasyCartService,
    protected orderService: OrderService,
  ) {
    this.easyCartService.onChangeUrl((id) =>
      this.orderService.findById(id).subscribe((order) => this.order.set(order)),
    );
  }
}
