import { Component, Injector } from '@angular/core';
import { CrudList } from '../core/framework/crud-list';
import { Order } from './order-data';
import { Observable } from 'rxjs';
import { PageResponse } from '../core/framework/page-data';
import { OrderService } from './order.service';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableHeader } from '../shared/table-header/table-header';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PaymentMethodPipe } from '../shared/pipes/payment-method.pipe';
import { ProductChips } from './product-chips/product-chips';

@Component({
  selector: 'app-order-list',
  imports: [
    Card,
    FormsModule,
    Button,
    TableModule,
    CurrencyPipe,
    RouterLink,
    TableHeader,
    DatePipe,
    PaymentMethodPipe,
    ProductChips,
  ],
  templateUrl: './order-list.html',
})
export class OrderList extends CrudList<Order> {
  constructor(
    protected override injector: Injector,
    protected orderService: OrderService,
  ) {
    super(injector);
  }

  protected override findAll(): Observable<PageResponse<Order>> {
    return this.orderService.findAll(this.getPageable('id,desc'), this.query);
  }
}
