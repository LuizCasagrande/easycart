import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './user-data';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly endpoint = `${environment.apiUrl}/v1/user`;
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.pipe(filter((user) => user !== null));

  constructor(protected http: HttpClient) {}

  findLoggedIn(): Observable<User> {
    return this.http
      .get<User>(`${this.endpoint}/logged-in`)
      .pipe(tap((user) => this.userSubject.next(user)));
  }

  update(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.endpoint}/logged-in`, user)
      .pipe(tap((updatedUser) => this.userSubject.next(updatedUser)));
  }
}
