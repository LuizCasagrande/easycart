import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailComponent} from './product-detail.component';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ImageModule,
    Button,
    RouterLink,
    InputNumberModule,
    FormsModule,
  ],
  declarations: [
    ProductDetailComponent,
  ],
  exports: [
    ProductDetailComponent,
  ],
})
export class ProductModule {
}
