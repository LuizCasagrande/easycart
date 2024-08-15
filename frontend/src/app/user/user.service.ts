import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable()
export class UserService {

  // @ts-ignore
  userSubject = new BehaviorSubject<User>(null);
  private readonly endpoint = `${environment.apiUrl}/v1/user`;

  constructor(private readonly http: HttpClient) {
  }

  findLoggedIn(): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/logged-in`)
      .pipe(tap(user => this.userSubject.next(user)));
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/logged-in`, user);
  }
}
