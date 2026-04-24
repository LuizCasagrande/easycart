import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { DataView } from 'primeng/dataview';
import { InputNumber } from 'primeng/inputnumber';
import { RouterLink } from '@angular/router';
import { Product } from '../../management/product/product-data';
import { FormsModule } from '@angular/forms';
import { QuantityPipe } from '../../shared/pipes/quantity.pipe';

@Component({
  selector: 'app-cart-product-list',
  imports: [
    Button,
    Card,
    CurrencyPipe,
    DataView,
    InputNumber,
    RouterLink,
    FormsModule,
    QuantityPipe,
  ],
  templateUrl: './cart-product-list.html',
})
export class CartProductList {
  @Input()
  products: Product[] = [];

  @Input()
  readOnly = false;

  @Output()
  onRemove = new EventEmitter<number>();

  @Output()
  onSetQuantity = new EventEmitter<{ productId: number; newQuantity: number }>();
}
