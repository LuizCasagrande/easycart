import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';

const BEARER = 'Bearer ';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);

  if (loginService.isTokenValid()) {
    req = req.clone({ setHeaders: { Authorization: BEARER + loginService.getToken() } });
  }
  return next(req);
};
