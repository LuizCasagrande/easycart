import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartService} from "./cart.service";
import {CartComponent} from './cart.component';
import {CardModule} from "primeng/card";
import {StepsModule} from "primeng/steps";
import {DataViewModule} from "primeng/dataview";
import {Button} from "primeng/button";
import {FieldModule} from "../shared/field/field.module";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {PaymentComponent} from './payment/payment.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    StepsModule,
    DataViewModule,
    Button,
    FieldModule,
    InputNumberModule,
    FormsModule,
  ],
  declarations: [
    CartComponent,
    PaymentComponent,
    ConfirmationComponent,
  ],
  exports: [
    CartComponent,
  ],
  providers: [
    CartService,
  ],
})
export class CartModule {
}
