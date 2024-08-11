import {Component, Injector, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {catchError, Observable} from "rxjs";
import {CrudList} from "../../framework/crud-list";
import {PageResponse} from "../../framework/page-response";
import {ConfirmationService} from "primeng/api";
import {Err} from "../../shared/err";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent extends CrudList<Product> implements OnInit {

  constructor(protected override readonly injector: Injector,
              private readonly productService: ProductService,
              private readonly confirmationService: ConfirmationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
  }

  override findAll(): Observable<PageResponse<Product>> {
    return this.productService.findAll(this.getPageable());
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
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Registro removido.',
            });
          });
      },
    });
  }
}
