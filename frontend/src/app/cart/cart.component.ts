import {Component, OnInit} from '@angular/core';
import {ORDER_STEPS} from "../shared/constants/app.constants";
import {CartService} from "./cart.service";
import {ProductService} from "../management/product/product.service";
import {ConfirmationService} from "primeng/api";
import {UserService} from "../user/user.service";
import {EasyCartService} from "../shared/easy-cart.service";
import {Cart} from "./cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  steps = ORDER_STEPS;
  activeIndex = 0;
  storage = this.cartService.getCart();
  cart = new Cart();

  constructor(private readonly ecService: EasyCartService,
              private readonly cartService: CartService,
              private readonly productService: ProductService,
              private readonly userService: UserService,
              private readonly confirmationService: ConfirmationService) {
    this.cartService.cartSize$
      .subscribe(() => this.storage = this.cartService.getCart());
  }

  ngOnInit(): void {
    this.ecService.executeRequest(this.userService.findLoggedIn(), false)
      .subscribe(user => this.cart.user = user);

    this.storage.forEach((quantity, productId) => this.ecService
      .executeRequest(this.productService.findById(Number(productId)), false)
      .subscribe(product => {
        product.quantity = quantity;
        this.cart.products.push(product)
      }));
  }

  protected remove(productId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.cartService.remove(productId);
        this.cart.products = this.cart.products.filter(p => productId !== p.id);
      },
    });
  }

  protected getTotal(): number {
    return this.cart.products.reduce((total, p) => total + (p.price * p.quantity!), 0);
  }

  protected getQuantity(productId: number): number {
    return this.storage.get(String(productId))!;
  }

  protected setQuantity(productId: number, newQuantity: number): void {
    this.cartService.add(productId, newQuantity - this.getQuantity(productId));
  }
}
