import {Directive, Injector, ViewChild} from "@angular/core";
import {Table} from "primeng/table";
import {catchError, finalize, Observable, of} from "rxjs";
import {PageResponse} from "./page-response";
import {MessageService} from "primeng/api";
import {Err} from "../../shared/err";

@Directive()
export abstract class CrudList<T> {

  @ViewChild(Table)
  protected table!: Table;
  protected value: T[] = [];
  protected totalRecords = 0;
  protected loading = false;
  protected messageService: MessageService;

  protected constructor(protected readonly injector: Injector) {
    this.messageService = this.injector.get(MessageService);
  }

  findAll(): Observable<PageResponse<T>> {
    return of();
  }

  protected load(): void {
    this.loading = true;
    this.findAll()
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loading = false),
      )
      .subscribe(r => {
        this.value = r.content;
        this.totalRecords = r.page.totalElements;
      });
  }

  protected getPageable(): { page: number, size: number, sort: string } {
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
