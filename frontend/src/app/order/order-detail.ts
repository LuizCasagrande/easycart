import { Component, model, OnDestroy } from '@angular/core';
import { CartProductList } from '../cart/product-list/cart-product-list';
import { OrderService } from './order.service';
import { EasyCartService } from '../shared/easy-cart.service';
import { Order } from './order-data';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { HeaderActions } from '../shared/header-actions/header-actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [CartProductList, Card, Button, HeaderActions, RouterLink],
  templateUrl: './order-detail.html',
})
export class OrderDetail implements OnDestroy {
  protected order = model<Order | null>(null);

  constructor(
    protected easyCartService: EasyCartService,
    protected orderService: OrderService,
  ) {
    this.easyCartService.onChangeUrl((id) => // todo fix
      this.orderService.findById(id).subscribe((order) => this.order.set(order)),
    );
  }

  ngOnDestroy(): void {}
}
