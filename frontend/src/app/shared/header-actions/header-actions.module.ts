import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcTemplate, HeaderActionsComponent} from './header-actions.component';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    Button,
    RouterLink,
  ],
  declarations: [
    HeaderActionsComponent,
    EcTemplate,
  ],
  exports: [
    HeaderActionsComponent,
    EcTemplate,
  ],
})
export class HeaderActionsModule {
}
