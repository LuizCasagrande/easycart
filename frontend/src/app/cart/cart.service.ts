import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CartService {

  cartChangeEvent = new BehaviorSubject<number>(0);
  private readonly cart = 'cart';

  add(productId: number, quantity?: number): void {
    const cart = this.getCart();
    quantity = quantity || 1;

    const currentQuantity = cart.get(productId.toString());
    if (currentQuantity != null) {
      quantity += currentQuantity;
    }

    cart.set(productId.toString(), quantity);
    this.setCart(cart);
    this.cartChangeEvent.next(cart.size);
  }

  remove(productId: number): void {
    const cart = this.getCart();
    cart.delete(productId.toString());
    this.setCart(cart);
    this.cartChangeEvent.next(cart.size);
  }

  getCartSize(): number {
    return this.getCart().size;
  }

  getCart(): Map<string, number> {
    return new Map(JSON.parse(localStorage.getItem(this.cart) || '[]'));
  }

  private setCart(cart: Map<string, number>): void {
    localStorage.setItem(this.cart, JSON.stringify(Array.from(cart.entries())));
  }
}
