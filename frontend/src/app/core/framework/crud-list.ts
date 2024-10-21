import {Directive, Injector, ViewChild} from "@angular/core";
import {Table} from "primeng/table";
import {debounceTime, distinctUntilChanged, Observable, of, Subject} from "rxjs";
import {PageResponse} from "./page-response";
import {Pageable} from "../../shared/pageable";
import {EasyCartService} from "../../shared/easy-cart.service";
import {ConfirmationService} from "primeng/api";
import {MESSAGES} from "../../shared/constants/app.constants";

@Directive()
export abstract class CrudList<T> {

  @ViewChild(Table)
  protected table!: Table;
  protected value: T[] = [];
  protected totalRecords = 0;
  protected loading = false;
  protected query = '';
  protected query$ = new Subject<string>();
  protected ecService: EasyCartService;
  protected confirmationService: ConfirmationService;

  protected constructor(protected readonly injector: Injector) {
    this.ecService = this.injector.get(EasyCartService);
    this.confirmationService = this.injector.get(ConfirmationService);

    this.query$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.load());
  }

  protected findAll(): Observable<PageResponse<T>> {
    return of();
  }

  protected remove(id: number): Observable<void> {
    return of();
  }

  protected onRemove(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover?',
      accept: () => this.ecService.executeRequest(this.remove(id))
        .subscribe(() => {
          this.load();
          this.ecService.addMessage(MESSAGES.RECORD_REMOVED);
        }),
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
