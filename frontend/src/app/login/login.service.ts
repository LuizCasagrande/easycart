import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {

  setTokenEvent = new EventEmitter();
  private readonly endpoint = `${environment.apiUrl}/v1/login`;
  private readonly authorization = 'authorization';

  constructor(private readonly http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.endpoint, loginRequest);
  }

  logout(): void {
    localStorage.clear();
  }

  hasToken(): boolean {
    return this.getToken() != null;
  }

  getToken(): string {
    return localStorage.getItem(this.authorization)!;
  }

  setToken(token: string): void {
    localStorage.setItem(this.authorization, token);
    this.setTokenEvent.emit();
  }

  hasTokenExpired(): boolean {
    const expiry = JSON.parse(atob(this.getToken().split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}
