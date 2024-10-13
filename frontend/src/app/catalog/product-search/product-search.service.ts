import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ProductSearchService {

  onSearch = new Subject<string>();

  search(query: string): void {
    this.onSearch.next(query);
  }
}
