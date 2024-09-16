import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './breadcrumb.component';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
  ],
  declarations: [
    BreadcrumbComponent,
  ],
  exports: [
    BreadcrumbComponent,
  ],
})
export class EcBreadcrumbModule {
}
