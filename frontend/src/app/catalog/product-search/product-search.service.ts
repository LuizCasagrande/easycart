import { Injectable } from '@angular/core';
import { debounceTime, filter, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductSearchService {
  private readonly searchSubject = new Subject<string>();
  search$ = this.searchSubject.pipe(
    debounceTime(500),
    filter((query) => query.length > 0),
  );

  search(query: string): void {
    this.searchSubject.next(query.trim());
  }
}
