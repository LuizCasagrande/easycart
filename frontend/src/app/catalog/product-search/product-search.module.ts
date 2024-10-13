import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductSearchComponent} from "./product-search.component";
import {ProductSearchService} from "./product-search.service";
import {DialogModule} from "primeng/dialog";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    RouterLink,
  ],
  declarations: [
    ProductSearchComponent,
  ],
  exports: [
    ProductSearchComponent,
  ],
  providers: [
    ProductSearchService,
  ],
})
export class ProductSearchModule {
}
