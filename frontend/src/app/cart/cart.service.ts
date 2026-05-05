import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CART } from '../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartMapSubject = new BehaviorSubject<Map<string, number>>(this.getFromStorage());
  cartMap$ = this.cartMapSubject.asObservable();
  cartSize$ = this.cartMap$.pipe(map((e) => e.size));

  add(productId: number, quantity: number = 1): void {
    const cartMap = new Map(this.cartMapSubject.value);
    quantity += cartMap.get(productId.toString()) || 0;
    cartMap.set(productId.toString(), quantity);
    this.update(cartMap);
  }

  remove(productId: number): void {
    const cartMap = new Map(this.cartMapSubject.value);
    cartMap.delete(productId.toString());
    this.update(cartMap);
  }

  reset(): void {
    this.update(new Map());
  }

  private update(cartMap: Map<string, number>) {
    localStorage.setItem(CART, JSON.stringify(Array.from(cartMap.entries())));
    this.cartMapSubject.next(cartMap);
  }

  private getFromStorage(): Map<string, number> {
    return new Map(JSON.parse(localStorage.getItem(CART) || '[]'));
  }
}
