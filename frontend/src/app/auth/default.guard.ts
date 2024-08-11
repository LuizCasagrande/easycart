import {Injectable} from "@angular/core";
import {CanActivate, GuardResult, MaybeAsync, Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultGuard implements CanActivate {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    if (this.loginService.hasToken()
      && !this.loginService.hasTokenExpired()) {
      return true;
    }

    this.loginService.logout();
    this.router.navigateByUrl('login').catch();
    return false;
  }
}
