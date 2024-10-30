import {NgModule} from "@angular/core";
import {PhonePipe} from "./pipes/phone.pipe";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PhonePipe,
  ],
  exports: [
    PhonePipe,
  ]
})
export class SharedModule {
}
