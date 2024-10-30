import {Component, Input} from '@angular/core';
import {User} from "../../user/user";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {

  @Input()
  user!: User;
}
