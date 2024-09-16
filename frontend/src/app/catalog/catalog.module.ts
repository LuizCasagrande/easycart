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
import {CatalogListComponent} from './catalog-list/catalog-list.component';
import {CatalogGridComponent} from './catalog-grid/catalog-grid.component';
import {FieldModule} from "../shared/field/field.module";
import {InputNumberModule} from "primeng/inputnumber";

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
        FieldModule,
        InputNumberModule,
    ],
  declarations: [
    CatalogComponent,
    CatalogListComponent,
    CatalogGridComponent,
  ],
  exports: [
    CatalogComponent,
    CatalogListComponent,
    CatalogGridComponent,
  ],
})
export class CatalogModule {
}
