import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest, LoginService} from "./login.service";
import {BaseForm} from "../core/framework/base-form";
import {SidebarService} from "../core/sidebar/sidebar.service";
import {EasyCartService} from "../shared/easy-cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(private readonly ecService: EasyCartService,
              private readonly loginService: LoginService,
              private readonly sidebarService: SidebarService) {
    super();
  }

  ngOnInit(): void {
    this.loginService.hasToken()
      ? this.navigateToCatalog()
      : this.sidebarService.hide();
  }

  protected override createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  protected override submit(): void {
    this.ecService.executeRequest(this.loginService.login(<LoginRequest>this.form.value))
      .subscribe(r => {
        if (r.token != null) {
          this.loginService.setToken(r.token);
          this.navigateToCatalog();
        }
      });
  }

  private navigateToCatalog(): void {
    this.ecService.navigateByUrl('catalog').catch();
  }
}
