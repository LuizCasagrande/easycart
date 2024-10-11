import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";
import {PageResponse} from "../../core/framework/page-response";
import {Pageable} from "../../shared/pageable";

@Injectable()
export class ProductService {

  private readonly endpoint = `${environment.apiUrl}/v1/product`;

  constructor(private readonly http: HttpClient) {
  }

  findAll(pageable: Pageable, query?: string): Observable<PageResponse<Product>> {
    const params = this.getPageableParams(pageable).set('query', query || '');
    return this.http.get<PageResponse<Product>>(this.endpoint, {params});
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.endpoint}/${id}`);
  }

  save(product: Product, id?: number): Observable<Product> {
    if (id) {
      return this.http.put<Product>(`${this.endpoint}/${id}`, product);
    }
    return this.http.post<Product>(`${this.endpoint}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  findAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.endpoint}/category`);
  }

  findByCategoryIn(pageable: Pageable, categories: string[]): Observable<PageResponse<Product>> {
    const params = this.getPageableParams(pageable).set('categories', categories.join(','));
    return this.http.get<PageResponse<Product>>(`${this.endpoint}/category-in`, {params});
  }

  private getPageableParams(pageable: Pageable) {
    return new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size)
      .set('sort', pageable.sort);
  }
}
