import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from './user-form.component';
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {FieldModule} from "../shared/field/field.module";
import {HeaderActionsModule} from "../shared/header-actions/header-actions.module";
import {TagModule} from "primeng/tag";

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    Button,
    RouterLink,
    InputTextModule,
    InputNumberModule,
    FieldModule,
    HeaderActionsModule,
    TagModule,
  ],
  declarations: [
    UserFormComponent,
  ],
  exports: [
    UserFormComponent,
  ],
})
export class UserModule {
}
