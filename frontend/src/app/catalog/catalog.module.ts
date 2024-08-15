import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {DataViewModule} from 'primeng/dataview';
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ProductModule} from "./product/product.module";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DataViewModule,
    Button,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    ProductModule,
    RouterLink,
  ],
  declarations: [
    CatalogComponent,
  ],
  exports: [
    CatalogComponent,
  ],
})
export class CatalogModule {
}
