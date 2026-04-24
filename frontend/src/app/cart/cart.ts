import { Component, OnInit } from '@angular/core';
import { MESSAGES, ORDER_STEPS } from '../shared/constants/app.constants';
import { EasyCartService } from '../shared/easy-cart.service';
import { CartService } from './cart.service';
import { ProductService } from '../management/product/product.service';
import { UserService } from '../user/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Resume } from './resume/resume';
import { Payment } from './payment/payment';
import { Shipping } from './shipping/shipping';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Steps } from 'primeng/steps';
import { CartRequest } from './cart-data';
import { Confirmation } from './confirmation/confirmation';
import { CartProductList } from './product-list/cart-product-list';

@Component({
  selector: 'app-cart',
  imports: [Resume, Payment, Shipping, Card, FormsModule, Steps, Confirmation, CartProductList],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  protected steps = ORDER_STEPS;
  protected activeIndex = 0;
  protected cart: Map<string, number> = new Map();
  protected cartRequest = new CartRequest();

  constructor(
    protected easyCartService: EasyCartService,
    protected cartService: CartService,
    protected productService: ProductService,
    protected userService: UserService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
  ) {
    this.userService.user$.subscribe((user) => (this.cartRequest.user = user));
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));
  }

  ngOnInit(): void {
    this.cart.forEach((quantity, productId) =>
      this.easyCartService // todo better
        .executeRequest(this.productService.findById(Number(productId)), false)
        .subscribe((product) => {
          product.quantity = quantity;
          this.cartRequest.products.push(product);
          this.cartRequest.products = this.cartRequest.products.sort((a, b) => a.id - b.id);
        }),
    );
  }

  protected remove(productId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.cartService.remove(productId);
        this.cartRequest.products = this.cartRequest.products.filter((p) => productId !== p.id);
        this.messageService.add(MESSAGES.REMOVED_FROM_CART);
      },
    });
  }

  protected getTotal(): number {
    return this.cartRequest.products.reduce((total, p) => total + p.price * p.quantity!, 0);
  }

  protected setQuantity(productId: number, newQuantity: number): void {
    const oldQuantity = this.cart.get(String(productId))!;
    this.cartService.add(productId, newQuantity - oldQuantity);
  }
}
