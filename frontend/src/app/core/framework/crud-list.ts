import { AfterViewInit, ChangeDetectorRef, Directive, Injector, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Observable, of, Subject } from 'rxjs';
import { EasyCartService } from '../../shared/easy-cart.service';
import { ConfirmationService } from 'primeng/api';
import { Pageable, PageResponse } from './page-data';
import { MESSAGES } from '../../shared/constants/app.constants';

@Directive()
export abstract class CrudList<T> implements AfterViewInit {
  @ViewChild(Table)
  protected table!: Table;
  protected value: T[] = [];
  protected totalRecords = 0;
  protected loading = false;
  protected query = '';
  protected query$ = new Subject<string>();
  protected easyCartService: EasyCartService;
  protected confirmationService: ConfirmationService;
  protected changeDetector: ChangeDetectorRef;

  protected constructor(protected injector: Injector) {
    this.easyCartService = this.injector.get(EasyCartService);
    this.confirmationService = this.injector.get(ConfirmationService);
    this.changeDetector = this.injector.get(ChangeDetectorRef);

    this.query$.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.load());
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
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
      accept: () =>
        this.easyCartService.executeRequest(this.remove(id)).subscribe(() => {
          this.load();
          this.easyCartService.addMessage(MESSAGES.RECORD_REMOVED);
        }),
    });
  }

  protected load(): void {
    this.loading = true;
    this.easyCartService
      .executeRequest(this.findAll(), false, () => (this.loading = false))
      .subscribe((r) => {
        this.value = r.content;
        this.totalRecords = r.page.totalElements;
      });
  }

  protected getPageable(sort = 'id,asc'): Pageable {
    let page = 0;
    let size = 10;
    if (this.table != null) {
      size = <number>this.table.rows;
      page = <number>this.table.first / size;
      if (this.table.sortField != null) {
        sort = this.table.sortField + (this.table.sortOrder > 0 ? ',asc' : ',desc');
      }
    }
    return { page, size, sort };
  }
}
