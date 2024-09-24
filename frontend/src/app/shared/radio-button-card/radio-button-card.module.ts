import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioButtonCardComponent} from './radio-button-card.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RadioButtonModule,
    FormsModule,
  ],
  declarations: [
    RadioButtonCardComponent,
  ],
  exports: [
    RadioButtonCardComponent,
  ],
})
export class RadioButtonCardModule {
}
