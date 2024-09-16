import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";
import {PageResponse} from "../../core/framework/page-response";

@Injectable()
export class ProductService {

  private readonly endpoint = `${environment.apiUrl}/v1/product`;

  constructor(private readonly http: HttpClient) {
  }

  findAll(pageable: { page: number, size: number, sort: string }): Observable<PageResponse<Product>> {
    return this.http.get<PageResponse<Product>>(`${this.endpoint}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}`);
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
}
