import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultGuard implements CanActivate {
  constructor(protected loginService: LoginService) {}

  canActivate(): MaybeAsync<GuardResult> {
    return this.loginService.isTokenValid();
  }
}
