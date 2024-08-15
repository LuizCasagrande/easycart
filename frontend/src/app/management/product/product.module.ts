import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list.component';
import {CardModule} from "primeng/card";
import {ProductService} from "./product.service";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {ProductFormComponent} from './product-form.component';
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ImageModule} from "primeng/image";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {HeaderActionsModule} from "../../shared/header-actions/header-actions.module";
import {FieldModule} from "../../shared/field/field.module";
import {TagModule} from "primeng/tag";

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        TableModule,
        Button,
        RouterLink,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputTextareaModule,
        ImageModule,
        IconFieldModule,
        InputIconModule,
        HeaderActionsModule,
        FieldModule,
        TagModule,
    ],
  declarations: [
    ProductListComponent,
    ProductFormComponent,
  ],
  exports: [
    ProductListComponent,
    ProductFormComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductModule {
}
