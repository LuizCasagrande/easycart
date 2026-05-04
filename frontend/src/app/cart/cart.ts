import { Component, OnInit } from '@angular/core';
import { MESSAGES } from '../shared/constants/app.constants';
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
import { CartDto, FINAL_STEP, ORDER_STEPS } from './cart-data';
import { Confirmation } from './confirmation/confirmation';
import { CartProductList } from './product-list/cart-product-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [Resume, Payment, Shipping, Card, FormsModule, Steps, Confirmation, CartProductList],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  protected orderSteps = ORDER_STEPS;
  protected activeIndex = 0;
  protected cartMap: Map<string, number> = new Map();
  protected cartDto = new CartDto();

  constructor(
    protected easyCartService: EasyCartService,
    protected cartService: CartService,
    protected productService: ProductService,
    protected userService: UserService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected router: Router,
  ) {
    this.userService.user$.subscribe((user) => (this.cartDto.user = user));
    this.cartService.cartMap$.subscribe((cartMap) => (this.cartMap = cartMap));
  }

  ngOnInit(): void {
    this.cartMap.forEach((quantity, productId) =>
      this.easyCartService // todo better
        .executeRequest(this.productService.findById(Number(productId)), false)
        .subscribe((product) => {
          product.quantity = quantity;
          this.cartDto.products.push(product);
          this.cartDto.products = this.cartDto.products.sort((a, b) => a.id - b.id);
        }),
    );
  }

  protected remove(productId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.cartService.remove(productId);
        this.cartDto.products = this.cartDto.products.filter((p) => productId !== p.id);
        this.messageService.add(MESSAGES.REMOVED_FROM_CART);
      },
    });
  }

  protected getTotal(): number {
    return this.cartDto.products.reduce((total, p) => total + p.price * p.quantity!, 0);
  }

  protected setQuantity(productId: number, newQuantity: number): void {
    const oldQuantity = this.cartMap.get(String(productId))!;
    this.cartService.add(productId, newQuantity - oldQuantity);
  }

  protected navigate(currentStep: number): void {
    FINAL_STEP === currentStep ? this.save() : (this.activeIndex = currentStep);
  }

  private save(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja finalizar?',
      accept: () => {
        this.easyCartService.executeRequest(this.cartService.save(this.cartDto)).subscribe(() => {
          this.cartService.reset();
          this.router
            .navigateByUrl('/catalog')
            .then(() => this.messageService.add(MESSAGES.ORDER_COMPLETED));
        });
      },
    });
  }
}
