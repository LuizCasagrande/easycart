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
import {RadioButtonModule} from "primeng/radiobutton";
import {PaymentComponent} from './payment/payment.component';
import {ShippingComponent} from './shipping/shipping.component';
import {RadioButtonCardModule} from "../shared/radio-button-card/radio-button-card.module";
import {HeaderActionsModule} from "../shared/header-actions/header-actions.module";
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {SharedModule} from "../shared/shared.module";
import {DividerModule} from "primeng/divider";
import {ResumeComponent} from './resume/resume.component';

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
    RadioButtonModule,
    RadioButtonCardModule,
    HeaderActionsModule,
    SharedModule,
    DividerModule,
  ],
  declarations: [
    CartComponent,
    PaymentComponent,
    ShippingComponent,
    ConfirmationComponent,
    ResumeComponent,
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
