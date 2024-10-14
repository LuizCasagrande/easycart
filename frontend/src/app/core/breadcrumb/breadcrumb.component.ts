import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {EasyCartService} from "../../shared/easy-cart.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {

  protected home: MenuItem = {icon: 'pi pi-home', routerLink: '/catalog'};
  protected items: MenuItem[] = [];

  constructor(private readonly easyCartService: EasyCartService) {
    this.easyCartService.onNavigationEnd().subscribe(url => {
      this.items = [];
      if (url.startsWith('/management')) {
        const items = url.split('/');
        items.shift();
        this.items = items.map(i => ({label: i.charAt(0).toUpperCase() + i.slice(1)}));
      }
    });
  }
}
