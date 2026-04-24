import { Component } from '@angular/core';
import { ProductService } from '../../management/product/product.service';
import { Product } from '../../management/product/product-data';
import { CartService } from '../../cart/cart.service';
import { MESSAGES } from '../../shared/constants/app.constants';
import { EasyCartService } from '../../shared/easy-cart.service';
import { Card } from 'primeng/card';
import { HeaderActions } from '../../shared/header-actions/header-actions';
import { Button } from 'primeng/button';
import { Image } from 'primeng/image';
import { Field } from '../../shared/field/field';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuantityPipe } from '../../shared/pipes/quantity.pipe';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  imports: [
    Card,
    HeaderActions,
    Button,
    Image,
    Field,
    InputNumber,
    FormsModule,
    CurrencyPipe,
    RouterLink,
    QuantityPipe,
  ],
})
export class ProductDetail {
  protected product!: Product;

  constructor(
    protected easyCartService: EasyCartService,
    protected productService: ProductService,
    protected cartService: CartService,
  ) {
    this.easyCartService.onChangeUrl((id) =>
      this.easyCartService.executeRequest(this.productService.findById(id)).subscribe((p) => {
        p.quantity = 1;
        this.product = p;
      }),
    );
  }

  protected addToCart(): void {
    this.cartService.add(this.product.id, this.product.quantity);
    this.easyCartService.addMessage(MESSAGES.ADDED_TO_CART);
  }
}
