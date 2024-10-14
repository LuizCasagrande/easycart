import {Directive, Injector, ViewChild} from "@angular/core";
import {Table} from "primeng/table";
import {Observable, of} from "rxjs";
import {PageResponse} from "./page-response";
import {Pageable} from "../../shared/pageable";
import {EasyCartService} from "../../shared/easy-cart.service";
import {ConfirmationService} from "primeng/api";

@Directive()
export abstract class CrudList<T> {

  @ViewChild(Table)
  protected table!: Table;
  protected value: T[] = [];
  protected totalRecords = 0;
  protected loading = false;
  protected ecService: EasyCartService;
  protected confirmationService: ConfirmationService;

  protected constructor(protected readonly injector: Injector) {
    this.ecService = this.injector.get(EasyCartService);
    this.confirmationService = this.injector.get(ConfirmationService);
  }

  protected findAll(): Observable<PageResponse<T>> {
    return of();
  }

  protected remove(id: number): void {
  }

  protected onRemove(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover?',
      accept: () => this.remove(id),
    });
  }

  protected load(): void {
    this.loading = true;
    this.ecService.executeRequest(this.findAll(), false, () => this.loading = false)
      .subscribe(r => {
        this.value = r.content;
        this.totalRecords = r.page.totalElements;
      });
  }

  protected getPageable(): Pageable {
    let page = 0;
    let size = 10;
    let sort = 'id,asc';
    if (this.table != null) {
      size = <number>this.table.rows;
      page = <number>this.table.first / size;
      if (this.table.sortField != null) {
        sort = this.table.sortField + (this.table.sortOrder > 0 ? ',asc' : ',desc');
      }
    }
    return {page, size, sort};
  }
}
