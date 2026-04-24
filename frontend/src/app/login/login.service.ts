import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AUTHORIZATION } from '../shared/constants/app.constants';
import { CartService } from '../cart/cart.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  newTokenEvent = new EventEmitter();
  private readonly endpoint = `${environment.apiUrl}/v1/login`;

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected cartService: CartService,
  ) {}

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.endpoint, loginRequest);
  }

  logout(): void {
    localStorage.clear();
    this.cartService.reset();
    this.sendToLoginPage();
  }

  hasToken(): boolean {
    return this.getToken() != null;
  }

  getToken(): string {
    return localStorage.getItem(AUTHORIZATION)!;
  }

  setToken(token: string): void {
    localStorage.setItem(AUTHORIZATION, token);
    this.newTokenEvent.emit();
  }

  isTokenValid(): boolean {
    if (!this.hasToken()) {
      this.sendToLoginPage();
      return false;
    }
    const expiry = JSON.parse(atob(this.getToken().split('.')[1])).exp;
    const isValid = Math.floor(new Date().getTime() / 1000) < expiry;

    if (!isValid) {
      this.logout();
    }
    return isValid;
  }

  private sendToLoginPage() {
    this.router.navigateByUrl('login').catch();
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}
