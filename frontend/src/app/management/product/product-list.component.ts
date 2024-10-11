import {Component, Injector} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {catchError, debounceTime, distinctUntilChanged, Observable, Subject} from "rxjs";
import {CrudList} from "../../core/framework/crud-list";
import {PageResponse} from "../../core/framework/page-response";
import {ConfirmationService} from "primeng/api";
import {Err} from "../../shared/err";
import {MESSAGES} from "../../shared/constants/app.constants";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent extends CrudList<Product> {

  query = '';
  queryUpdate = new Subject<string>();

  constructor(protected override readonly injector: Injector,
              private readonly productService: ProductService,
              private readonly confirmationService: ConfirmationService) {
    super(injector);
    this.queryUpdate.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.load());
  }

  override findAll(): Observable<PageResponse<Product>> {
    return this.productService.findAll(this.getPageable(), this.query);
  }

  remove(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.productService.delete(id)
          .pipe(catchError(Err.handle(this.messageService)))
          .subscribe(() => {
            this.load();
            this.messageService.add(MESSAGES.RECORD_REMOVED);
          });
      },
    });
  }
}
