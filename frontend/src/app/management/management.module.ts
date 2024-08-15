import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductModule} from "./product/product.module";
import {ManagementRoutingModule} from "./management-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ProductModule,
  ],
  declarations: [],
  exports: [],
})
export class ManagementModule {
}
