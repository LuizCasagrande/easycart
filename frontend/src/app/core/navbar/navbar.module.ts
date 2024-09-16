import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    CommonModule,
    Button,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
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
