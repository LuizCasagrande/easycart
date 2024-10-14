import {Component, Injector} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {debounceTime, distinctUntilChanged, Observable, Subject} from "rxjs";
import {CrudList} from "../../core/framework/crud-list";
import {PageResponse} from "../../core/framework/page-response";
import {MESSAGES} from "../../shared/constants/app.constants";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent extends CrudList<Product> {

  protected query = '';
  protected query$ = new Subject<string>();

  constructor(protected override readonly injector: Injector,
              private readonly productService: ProductService) {
    super(injector);
    this.query$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.load());
  }

  protected override findAll(): Observable<PageResponse<Product>> {
    return this.productService.findAll(this.getPageable(), this.query);
  }

  protected override remove(id: number): void {
    this.ecService.executeRequest(this.productService.delete(id))
      .subscribe(() => {
        this.load();
        this.ecService.addMessage(MESSAGES.RECORD_REMOVED);
      });
  }
}
