import {Component} from '@angular/core';
import {User} from "../../user/user";
import {CartService} from "../cart.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {

  protected user!: User;
  protected shippingMethod!: string;
  protected paymentMethod!: string;

  constructor(private readonly userService: UserService,
              private readonly cartService: CartService) {
    this.userService.userSubject.subscribe(r => this.user = r);
    this.cartService.shipping$.subscribe(r => this.shippingMethod = r);
    this.cartService.payment$.subscribe(r => this.paymentMethod = r);
  }
}
