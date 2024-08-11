import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SidebarService {

  private readonly visibleSidebar = 'visible-sidebar';
  sidebarSubject = new BehaviorSubject<boolean>('true' == localStorage.getItem(this.visibleSidebar));

  toggle(): void {
    const value = !this.sidebarSubject.getValue();
    localStorage.setItem(this.visibleSidebar, String(value));
    this.sidebarSubject.next(value);
  }

  hide(): void {
    const value = false;
    localStorage.setItem(this.visibleSidebar, String(value));
    this.sidebarSubject.next(value);
  }
}
