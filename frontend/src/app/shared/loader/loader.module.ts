import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader.component';
import {BlockUIModule} from "primeng/blockui";

@NgModule({
  imports: [
    CommonModule,
    BlockUIModule,
  ],
  declarations: [
    LoaderComponent,
  ],
  exports: [
    LoaderComponent,
  ],
})
export class LoaderModule {
}
