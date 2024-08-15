import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {FieldModule} from "../shared/field/field.module";

@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        CardModule,
        Button,
        ReactiveFormsModule,
        FieldModule,
    ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [LoginService],
})
export class LoginModule {
}
