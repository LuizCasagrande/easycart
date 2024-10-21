import {Component} from '@angular/core';
import {User} from "../../user/user";
import {CartService} from "../cart.service";
import {UserService} from "../../user/user.service";
import {SHIPPING_METHODS} from "../../shared/constants/app.constants";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent {

  protected selected = '';
  protected user!: User;
  protected readonly SHIPPING_METHODS = SHIPPING_METHODS;

  constructor(private readonly userService: UserService,
              private readonly cartService: CartService) {
    this.userService.userSubject.subscribe(r => this.user = r);
    this.cartService.shipping$.subscribe(r => this.selected = r);
  }

  protected onSelect(value: string): void {
    this.cartService.shipping$.next(value);
  }
}
