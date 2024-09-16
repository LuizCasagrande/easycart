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
  quantity = 1;

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
        .subscribe(r => this.product = r);
    }
  }

  getId(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('id') || 0);
  }

  addToCart(): void {
    this.cartService.add(this.product.id, this.quantity);
    this.messageService.add(MESSAGES.ADDED_TO_CART);
  }
}
