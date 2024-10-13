import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ProductSearchModule} from "../../catalog/product-search/product-search.module";

@NgModule({
  imports: [
    CommonModule,
    Button,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ProductSearchModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class NavbarModule {
}
