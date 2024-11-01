import {Component, Input} from '@angular/core';
import {User} from "../../user/user";
import {Product} from "../../management/product/product";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {

  @Input()
  user!: User;

  @Input()
  products!: Product[];
}
