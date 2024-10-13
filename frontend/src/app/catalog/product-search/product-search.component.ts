import {Component, EventEmitter, Output} from '@angular/core';
import {ProductSearchService} from "./product-search.service";
import {catchError, debounceTime} from "rxjs";
import {ProductService} from "../../management/product/product.service";
import {Err} from "../../shared/err";
import {MessageService} from "primeng/api";
import {Product} from "../../management/product/product";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent {

  products: Product[] = [];
  visible = false;

  @Output()
  onSelect = new EventEmitter();

  constructor(private productSearchService: ProductSearchService,
              private productService: ProductService,
              private messageService: MessageService) {
    this.productSearchService.onSearch
      .pipe(debounceTime(400))
      .subscribe(query => {
        if (query.length > 0) {
          this.load(query);
        }
      });
  }

  protected select(): void {
    this.visible = false;
    this.onSelect.emit();
  }

  private load(query: string): void {
    const pageable = {page: 0, size: 10, sort: 'title,asc'};
    this.productService.findAll(pageable, query)
      .pipe(catchError(Err.handle(this.messageService)))
      .subscribe(r => {
        this.products = r.content;
        this.visible = this.products.length > 0;
      });
  }
}
