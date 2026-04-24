import { ChangeDetectorRef, Component, EventEmitter, Output, signal } from '@angular/core';
import { ProductSearchService } from './product-search.service';
import { catchError } from 'rxjs';
import { ProductService } from '../../management/product/product.service';
import { Err } from '../../shared/err';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Product } from '../../management/product/product-data';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.html',
  imports: [Dialog, PrimeTemplate, NgClass, RouterLink],
})
export class ProductSearch {
  protected products: Product[] = [];
  protected visible = false;

  @Output()
  onSelect = new EventEmitter();

  constructor(
    protected productSearchService: ProductSearchService,
    protected productService: ProductService,
    protected messageService: MessageService,
    protected changeDetector: ChangeDetectorRef,
  ) {
    this.productSearchService.search$.subscribe((query) => this.load(query));
  }

  protected select(): void {
    this.visible = false;
    this.products = [];
    this.onSelect.emit();
  }

  private load(query: string): void {
    const pageable = { page: 0, size: 10, sort: 'title,asc' };
    this.productService
      .findAll(pageable, query)
      .pipe(catchError(Err.handle(this.messageService)))
      .subscribe((r) => {
        this.products = r.content;
        this.visible = this.products.length > 0;
        this.changeDetector.detectChanges();
      });
  }
}
