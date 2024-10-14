import {Component} from '@angular/core';
import {ProductService} from "../../management/product/product.service";
import {Product} from "../../management/product/product";
import {CartService} from "../../cart/cart.service";
import {MESSAGES} from "../../shared/constants/app.constants";
import {EasyCartService} from "../../shared/easy-cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {

  protected product!: Product;

  constructor(private readonly easyCartService: EasyCartService,
              private readonly productService: ProductService,
              private readonly cartService: CartService) {
    this.easyCartService.onChangeUrl(id => this.easyCartService
      .executeRequest(this.productService.findById(id))
      .subscribe(p => {
        p.quantity = 1;
        this.product = p;
      }));
  }

  protected addToCart(): void {
    this.cartService.add(this.product.id, this.product.quantity);
    this.easyCartService.addMessage(MESSAGES.ADDED_TO_CART);
  }
}
