import {Component, Injector} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {Observable} from "rxjs";
import {CrudList} from "../../core/framework/crud-list";
import {PageResponse} from "../../core/framework/page-response";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent extends CrudList<Product> {

  constructor(protected override readonly injector: Injector,
              private readonly productService: ProductService) {
    super(injector);
  }

  protected override findAll(): Observable<PageResponse<Product>> {
    return this.productService.findAll(this.getPageable(), this.query);
  }

  protected override remove(id: number): Observable<void> {
    return this.productService.delete(id);
  }
}
