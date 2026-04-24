import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CART } from '../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartSubject = new BehaviorSubject<Map<string, number>>(this.getFromStorage());
  cart$ = this.cartSubject.asObservable();
  cartSize$ = this.cart$.pipe(map((cart) => cart.size));

  add(productId: number, quantity: number = 1): void {
    const cart = new Map(this.cartSubject.value);
    quantity += cart.get(productId.toString()) || 0;
    cart.set(productId.toString(), quantity);
    this.update(cart);
  }

  remove(productId: number): void {
    const cart = new Map(this.cartSubject.value);
    cart.delete(productId.toString());
    this.update(cart);
  }

  reset(): void {
    this.update(new Map());
  }

  private update(cart: Map<string, number>) {
    localStorage.setItem(CART, JSON.stringify(Array.from(cart.entries())));
    this.cartSubject.next(cart);
  }

  private getFromStorage(): Map<string, number> {
    return new Map(JSON.parse(localStorage.getItem(CART) || '[]'));
  }
}
