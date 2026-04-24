import { Component, Injector } from '@angular/core';
import { CrudList } from '../../core/framework/crud-list';
import { Product } from './product-data';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { PageResponse } from '../../core/framework/page-data';
import { Card } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputText } from 'primeng/inputtext';
import { TableHeader } from '../../shared/table-header/table-header';

@Component({
  selector: 'app-product-list',
  imports: [
    Card,
    IconField,
    InputIcon,
    FormsModule,
    Button,
    TableModule,
    CurrencyPipe,
    RouterLink,
    InputText,
    TableHeader,
  ],
  templateUrl: './product-list.html',
})
export class ProductList extends CrudList<Product> {
  constructor(
    protected override injector: Injector,
    protected productService: ProductService,
  ) {
    super(injector);
  }

  protected override findAll(): Observable<PageResponse<Product>> {
    return this.productService.findAll(this.getPageable(), this.query);
  }

  protected override remove(id: number): Observable<void> {
    return this.productService.delete(id);
  }
}
