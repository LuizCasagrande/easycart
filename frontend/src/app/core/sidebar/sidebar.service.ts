import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VISIBLE_SIDEBAR } from '../../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly sidebarSubject = new BehaviorSubject<boolean>(
    'true' === localStorage.getItem(VISIBLE_SIDEBAR),
  );
  visible$ = this.sidebarSubject.asObservable();

  toggle(): void {
    const value = !this.sidebarSubject.getValue();
    localStorage.setItem(VISIBLE_SIDEBAR, String(value));
    this.sidebarSubject.next(value);
  }

  hide(): void {
    localStorage.setItem(VISIBLE_SIDEBAR, String(false));
    this.sidebarSubject.next(false);
  }
}
