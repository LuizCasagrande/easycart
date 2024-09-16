import {Component, OnInit} from '@angular/core';
import {ORDER_STEPS} from "../shared/constants/app.constants";
import {CartService} from "./cart.service";
import {ProductService} from "../management/product/product.service";
import {Product} from "../management/product/product";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  steps = ORDER_STEPS;
  cart = new Map<string, number>();
  products: Product[] = [];
  activeIndex = 0;

  constructor(private readonly cartService: CartService,
              private readonly productService: ProductService,
              private readonly confirmationService: ConfirmationService) {
    this.cartService.cartChangeEvent
      .subscribe(() => this.cart = this.cartService.getCart());
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart()
    for (let productId of this.cart.keys()) {
      this.productService.findById(Number(productId))
        .subscribe(p => {
          p.quantity = this.getQuantity(p.id);
          this.products.push(p);
        });
    }
  }

  remove(productId: number): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.cartService.remove(productId);
        this.products = this.products.filter(p => p.id !== productId);
      },
    });
  }

  getTotal(): number {
    return this.products.reduce((total, product) => total + (product.price * product.quantity!), 0);
  }

  onChangeQuantity(productId: number, newQuantity: number): void {
    this.cartService.add(productId, newQuantity - this.getQuantity(productId));
  }

  private getQuantity(productId: number): number {
    return this.cart.get(String(productId))!;
  }
}
