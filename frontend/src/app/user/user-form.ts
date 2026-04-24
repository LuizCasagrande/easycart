import { Component } from '@angular/core';
import { BaseForm } from '../core/framework/base-form';
import { User, UserType } from './user-data';
import { EasyCartService } from '../shared/easy-cart.service';
import { UserService } from './user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MESSAGES } from '../shared/constants/app.constants';
import { Card } from 'primeng/card';
import { HeaderActions } from '../shared/header-actions/header-actions';
import { Button } from 'primeng/button';
import { Field } from '../shared/field/field';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    Card,
    HeaderActions,
    Button,
    Field,
    InputNumber,
    InputText,
    RouterLink,
    Tag,
  ],
  templateUrl: './user-form.html',
})
export class UserForm extends BaseForm {
  protected readonly USER_TYPE = UserType;

  constructor(
    protected easyCartService: EasyCartService,
    protected userService: UserService,
  ) {
    super();
    this.easyCartService
      .executeRequest(this.userService.findLoggedIn())
      .subscribe((r) => this.form.patchValue(r));
  }

  protected override createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      type: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl({ value: '', disabled: true }),
      phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
      address: new FormGroup({
        number: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
      }),
    });
  }

  protected override submit(): void {
    this.easyCartService
      .executeRequest(this.userService.update(<User>this.form.value))
      .subscribe((r) => {
        this.form.patchValue(r);
        this.easyCartService.addMessage(MESSAGES.USER_UPDATED);
      });
  }
}
