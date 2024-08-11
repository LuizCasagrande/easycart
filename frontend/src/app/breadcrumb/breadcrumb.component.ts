import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {filter, map, Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

  protected home: MenuItem = {icon: 'pi pi-home', routerLink: '/catalog'};
  protected items: MenuItem[] = [];
  private url$!: Observable<string>;

  constructor(private readonly router: Router) {
    this.url$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
    );
  }

  ngOnInit(): void {
    this.url$.subscribe(url => {
      const items = url.split('/');
      items.shift();
      this.items = items.map(i => ({label: i.charAt(0).toUpperCase() + i.slice(1)}));
    });
  }
}
