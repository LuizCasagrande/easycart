import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest, LoginService} from "./login.service";
import {Router} from "@angular/router";
import {catchError, finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {BaseForm} from "../framework/base-form";
import {Err} from "../shared/err";
import {LoaderService} from "../shared/loader/loader.service";
import {SidebarService} from "../sidebar/sidebar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(private readonly loginService: LoginService,
              private readonly sidebarService: SidebarService,
              private readonly loaderService: LoaderService,
              private readonly messageService: MessageService,
              private readonly router: Router) {
    super();
    this.createFormGroup();
  }

  ngOnInit(): void {
    if (this.loginService.hasToken()) {
      this.navigateToCatalog();
    } else {
      this.sidebarService.hide();
    }
  }

  override submit(): void {
    this.loaderService.show();
    this.loginService.login(<LoginRequest>this.form.value)
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe(r => {
        const token = r.token;
        if (token != null) {
          this.loginService.setToken(token);
          this.navigateToCatalog();
        }
      });
  }

  private navigateToCatalog(): void {
    this.router.navigateByUrl('catalog').catch();
  }

  private createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
