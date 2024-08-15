import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FieldComponent,
  ],
  exports: [
    FieldComponent,
  ],
})
export class FieldModule {
}
