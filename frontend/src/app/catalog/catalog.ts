import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../management/product/product-data';
import { ProductService } from '../management/product/product.service';
import { MessageService } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { Err } from '../shared/err';
import { MESSAGES } from '../shared/constants/app.constants';
import { DataView } from 'primeng/dataview';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CatalogGrid } from './catalog-grid/catalog-grid';
import { SelectButton } from 'primeng/selectbutton';
import { NgClass } from '@angular/common';
import { CatalogList } from './catalog-list/catalog-list';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-catalog',
  imports: [DataView, MultiSelect, FormsModule, CatalogGrid, SelectButton, NgClass, CatalogList],
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategories: string[] = [];
  loading = false;
  layout: 'list' | 'grid' = 'grid';

  constructor(
    protected productService: ProductService,
    protected cartService: CartService,
    protected messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.productService
      .findAllCategories()
      .pipe(catchError(Err.handle(this.messageService)))
      .subscribe((r) => this.categories.set(r));
    this.load();
  }

  protected load() {
    const pageable = { page: 0, size: 25, sort: 'id,asc' };
    this.loading = true;
    (this.selectedCategories.length > 0
      ? this.productService.findByCategoryIn(pageable, this.selectedCategories)
      : this.productService.findAll(pageable)
    )
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => (this.loading = false)),
      )
      .subscribe((r) => this.products.set(r.content));
  }

  protected addToCart(productId: number): void {
    this.cartService.add(productId);
    this.messageService.add(MESSAGES.ADDED_TO_CART);
  }
}
