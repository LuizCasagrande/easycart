import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pageable, PageResponse } from '../core/framework/page-data';
import { map, Observable, OperatorFunction } from 'rxjs';
import { Order } from './order-data';
import { getPageableParams } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly endpoint = `${environment.apiUrl}/v1/cart`;

  constructor(protected http: HttpClient) {}

  findAll(pageable: Pageable, query?: string): Observable<PageResponse<Order>> {
    const params = getPageableParams(pageable).set('query', query || '');
    return this.http.get<PageResponse<Order>>(this.endpoint, { params }).pipe(this.mapQuantities());
  }

  findById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.endpoint}/${id}`).pipe(this.mapQuantities());
  }

  private mapQuantities<T extends Order | PageResponse<Order>>(): OperatorFunction<T, T> {
    function setQuantities(order: Order): Order {
      order.products.forEach((p) => {
        p.product.quantity = p.quantity;
      });
      return order;
    }

    return map((data: any) => {
      if (data?.content) {
        data.content = data.content.map((order: Order) => setQuantities(order));
        return data;
      }
      return setQuantities(data);
    });
  }
}
