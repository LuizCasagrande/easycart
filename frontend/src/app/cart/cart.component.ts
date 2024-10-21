import {Component, OnInit} from '@angular/core';
import {ORDER_STEPS} from "../shared/constants/app.constants";
import {CartService} from "./cart.service";
import {ProductService} from "../management/product/product.service";
import {Product} from "../management/product/product";
import {ConfirmationService} from "primeng/api";
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {EasyCartService} from "../shared/easy-cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  steps = ORDER_STEPS;
  activeIndex = 0;
  user!: User;
  cart = this.cartService.getCart();
  products: Product[] = [];

  constructor(private readonly ecService: EasyCartService,
              private readonly cartService: CartService,
              private readonly productService: ProductService,
              private readonly userService: UserService,
              private readonly confirmationService: ConfirmationService) {
    this.cartService.cartSize$
      .subscribe(() => this.cart = this.cartService.getCart());
  }

  ngOnInit(): void {
    this.ecService.executeRequest(this.userService.findLoggedIn(), false)
      .subscribe(u => this.user = u);

    this.cart.forEach((quantity, productId) => this.ecService
      .executeRequest(this.productService.findById(Number(productId)), false)
      .subscribe(p => {
        p.quantity = quantity;
        this.products.push(p)
      }));
  }

  protected remove(productId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.cartService.remove(productId);
        this.products = this.products.filter(p => productId !== p.id);
      },
    });
  }

  protected getTotal(): number {
    return this.products.reduce((total, p) => total + (p.price * p.quantity!), 0);
  }

  protected getQuantity(productId: number): number {
    return this.cart.get(String(productId))!;
  }

  protected setQuantity(productId: number, newQuantity: number): void {
    this.cartService.add(productId, newQuantity - this.getQuantity(productId));
  }
}
