import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { map } from 'rxjs';
import { isManager } from '../user/user-data';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    protected router: Router,
  ) {}

  canActivate(): MaybeAsync<GuardResult> {
    return this.userService.user$.pipe(
      map((user) => {
        if (isManager(user)) {
          return true;
        }
        this.router.navigateByUrl('catalog').catch();
        return false;
      }),
    );
  }
}
