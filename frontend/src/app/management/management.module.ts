import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductModule} from "./product/product.module";

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
  ],
  declarations: [],
  exports: [],
})
export class ManagementModule {
}
