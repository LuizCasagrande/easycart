import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../management/product/product-data';

@Directive()
export class CatalogDataView {
  @Input()
  products: Product[] = [];

  @Output()
  onAdd = new EventEmitter<number>();
}
