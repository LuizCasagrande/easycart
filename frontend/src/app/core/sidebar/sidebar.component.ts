import {Component} from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {MenuItem} from "primeng/api";
import {UserService} from "../../user/user.service";
import {UserType} from "../../user/user";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  visible = false;
  protected items: MenuItem[] = [];

  constructor(private readonly sidebarService: SidebarService,
              private readonly userService: UserService) {
    combineLatest([
      this.userService.userSubject,
      this.sidebarService.sidebarSubject,
    ]).subscribe(r => {
      const user = r[0];
      const visible = r[1];
      this.visible = UserType.MANAGER === user?.type && visible;
    });
    this.items = [{
      label: 'Início',
      items: [{
        label: 'Catálogo',
        icon: 'pi pi-shopping-cart',
        routerLink: '/catalog',
      }],
    }, {
      label: 'Gerenciamento',
      items: [{
        label: 'Produtos',
        icon: 'pi pi-dollar',
        routerLink: '/management/product',
      }],
    }];
  }
}
