import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {SidebarService} from "./sidebar.service";

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    MenuModule,
  ],
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  providers: [SidebarService],
})
export class EcSidebarModule {
}
