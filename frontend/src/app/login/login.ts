import { Component, OnInit } from '@angular/core';
import { EasyCartService } from '../shared/easy-cart.service';
import { LoginRequest, LoginService } from './login.service';
import { BaseForm } from '../core/framework/base-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Field } from '../shared/field/field';
import { InputText } from 'primeng/inputtext';
import { SidebarService } from '../core/sidebar/sidebar.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Card, Button, Field, InputText],
  templateUrl: './login.html',
})
export class Login extends BaseForm implements OnInit {
  constructor(
    protected easyCartService: EasyCartService,
    protected loginService: LoginService,
    protected sidebarService: SidebarService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loginService.hasToken() ? this.navigateToCatalog() : this.sidebarService.hide();
  }

  protected override createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  protected override submit(): void {
    this.easyCartService
      .executeRequest(this.loginService.login(<LoginRequest>this.form.value))
      .subscribe((r) => {
        if (r.token != null) {
          this.loginService.setToken(r.token);
          this.navigateToCatalog();
        }
      });
  }

  private navigateToCatalog(): void {
    this.easyCartService.navigateByUrl('catalog').catch();
  }
}
