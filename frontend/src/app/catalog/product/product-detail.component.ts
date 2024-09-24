import {Component} from '@angular/core';
import {catchError, finalize} from "rxjs";
import {Err} from "../../shared/err";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../shared/loader/loader.service";
import {ProductService} from "../../management/product/product.service";
import {MessageService} from "primeng/api";
import {Product} from "../../management/product/product";
import {CartService} from "../../cart/cart.service";
import {MESSAGES} from "../../shared/constants/app.constants";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {

  product!: Product;

  constructor(private readonly productService: ProductService,
              private readonly cartService: CartService,
              private readonly loaderService: LoaderService,
              private readonly messageService: MessageService,
              private readonly activatedRoute: ActivatedRoute) {
    if (this.getId()) {
      this.loaderService.show();
      this.productService.findById(this.getId())
        .pipe(
          catchError(Err.handle(this.messageService)),
          finalize(() => this.loaderService.hide()),
        )
        .subscribe(p => {
          p.quantity = 1;
          this.product = p;
        });
    }
  }

  addToCart(): void {
    this.cartService.add(this.product.id, this.product.quantity);
    this.messageService.add(MESSAGES.ADDED_TO_CART);
  }

  private getId(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('id') || 0);
  }
}
