import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CART} from "../shared/constants/app.constants";

@Injectable()
export class CartService {

  readonly cartSize$ = new BehaviorSubject<number>(0);

  add(productId: number, quantity: number = 1): void {
    const cart = this.getCart();
    quantity += cart.get(productId.toString()) || 0;
    cart.set(productId.toString(), quantity);
    this.setCart(cart);
    this.cartSize$.next(cart.size);
  }

  remove(productId: number): void {
    const cart = this.getCart();
    cart.delete(productId.toString());
    this.setCart(cart);
    this.cartSize$.next(cart.size);
  }

  getCartSize(): number {
    return this.getCart().size;
  }

  getCart(): Map<string, number> {
    return new Map(JSON.parse(localStorage.getItem(CART) || '[]'));
  }

  private setCart(cart: Map<string, number>): void {
    localStorage.setItem(CART, JSON.stringify(Array.from(cart.entries())));
  }
}
