import { Component } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { SidebarService } from './sidebar.service';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { isManager } from '../../user/user-data';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [Drawer, Menu, PrimeTemplate, AsyncPipe],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  visible: Observable<boolean>;
  protected items: MenuItem[];

  constructor(
    protected sidebarService: SidebarService,
    protected userService: UserService,
  ) {
    this.visible = this.sidebarService.visible$;
    this.items = [
      {
        label: 'Início',
        items: [{ label: 'Catálogo', icon: 'pi pi-shopping-cart', routerLink: '/catalog' }],
      },
      {
        label: 'Gerenciamento',
        items: [{ label: 'Produtos', icon: 'pi pi-dollar', routerLink: '/management/product' }],
      },
    ];
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (1500 > window.innerWidth) {
        this.sidebarService.hide();
      }
    });
    this.userService.user$.subscribe((user) => {
      if (!isManager(user)) {
        this.sidebarService.hide();
      }
    });
  }
}
