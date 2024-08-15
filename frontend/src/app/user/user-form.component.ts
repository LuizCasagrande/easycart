import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {BaseForm} from "../framework/base-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, finalize} from "rxjs";
import {Err} from "../shared/err";
import {LoaderService} from "../shared/loader/loader.service";
import {MessageService} from "primeng/api";
import {User, UserType} from "./user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent extends BaseForm {

  protected readonly USER_TYPE = UserType;

  constructor(private readonly userService: UserService,
              private readonly loaderService: LoaderService,
              private readonly messageService: MessageService) {
    super();
    this.createFormGroup();
    this.userService.findLoggedIn()
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe(r => this.form.patchValue(r));
  }

  override submit(): void {
    this.loaderService.show();
    this.userService.update(<User>this.form.value)
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe(r => {
        this.form.patchValue(r);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado.',
        });
      });
  }

  private createFormGroup(): void {
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
}
