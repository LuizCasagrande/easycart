import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login/login.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private readonly BEARER = 'Bearer ';

  constructor(private readonly loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.hasToken()) {
      req = req.clone({setHeaders: {Authorization: this.BEARER + this.loginService.getToken()}});
    }
    return next.handle(req);
  }
}
