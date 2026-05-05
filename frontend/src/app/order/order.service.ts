import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pageable, PageResponse } from '../core/framework/page-data';
import { Observable } from 'rxjs';
import { Order } from './order-data';
import { getPageableParams } from '../shared/utils';
import { CartDto } from '../cart/cart-data';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly endpoint = `${environment.apiUrl}/v1/order`;

  constructor(protected http: HttpClient) {}

  save(cartDto: CartDto): Observable<Order> {
    return this.http.post<Order>(this.endpoint, {
      paymentMethod: cartDto.paymentMethod,
      quantityPerProduct: Object.fromEntries(cartDto.quantityPerProduct),
    });
  }

  findAll(pageable: Pageable, query?: string): Observable<PageResponse<Order>> {
    const params = getPageableParams(pageable).set('query', query || '');
    return this.http.get<PageResponse<Order>>(this.endpoint, { params });
  }

  findById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.endpoint}/${id}`);
  }
}
