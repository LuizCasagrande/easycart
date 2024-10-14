import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {BaseForm} from "../core/framework/base-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserType} from "./user";
import {EasyCartService} from "../shared/easy-cart.service";
import {MESSAGES} from "../shared/constants/app.constants";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent extends BaseForm {

  protected readonly USER_TYPE = UserType;

  constructor(private readonly ecService: EasyCartService,
              private readonly userService: UserService) {
    super();
    this.ecService.executeRequest(this.userService.findLoggedIn())
      .subscribe(r => this.form.patchValue(r));
  }

  protected override createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      type: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl({value: '', disabled: true}),
      phone: new FormControl('', Validators.required),
      address: new FormGroup({
        number: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
      }),
    });
  }

  protected override submit(): void {
    this.ecService.executeRequest(this.userService.update(<User>this.form.value))
      .subscribe(r => {
        this.form.patchValue(r);
        this.ecService.addMessage(MESSAGES.USER_UPDATED);
      });
  }
}
