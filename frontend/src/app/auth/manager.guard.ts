import {Injectable} from "@angular/core";
import {CanActivate, GuardResult, MaybeAsync, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {map, skipWhile} from "rxjs";
import {UserType} from "../user/user";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    return this.userService.userSubject.pipe(
      skipWhile(user => user == null),
      map(user => {
        if (UserType.MANAGER === user.type) {
          return true;
        }
        this.router.navigateByUrl('catalog').catch();
        return false;
      }),
    );
  }
}
