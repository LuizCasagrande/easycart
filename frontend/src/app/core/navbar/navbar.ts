import { Component, OnInit, signal } from '@angular/core';
import { isManager, User } from '../../user/user-data';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LoginService } from '../../login/login.service';
import { UserService } from '../../user/user.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { RouterLink } from '@angular/router';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { CartService } from '../../cart/cart.service';
import { ProductSearchService } from '../../catalog/product-search/product-search.service';
import { ProductSearch } from '../../catalog/product-search/product-search';
import { DARK_MODE } from '../../shared/constants/app.constants';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Menu, Button, IconField, InputIcon, FormsModule, InputText, ProductSearch],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  protected darkMode = false;
  protected cartSize = 0;
  protected search = '';
  protected userMenu: MenuItem[] = [];
  protected user = signal<User | null>(null);

  constructor(
    protected loginService: LoginService,
    protected userService: UserService,
    protected cartService: CartService,
    protected sidebarService: SidebarService,
    protected productSearchService: ProductSearchService,
    protected confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loginService.newTokenEvent.subscribe(() => this.findUserData());
    this.cartService.cartSize$.subscribe((r) => (this.cartSize = r));
    this.findUserData();
    this.userMenu = [
      { label: 'Perfil', routerLink: '/user' },
      { label: 'Sair', command: () => this.logout() },
    ];

    this.checkDarkMode();
  }

  isVisible(): boolean {
    return this.loginService.hasToken();
  }

  userIsManager(): boolean {
    return isManager(this.user()!);
  }

  logout(): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja sair?',
      accept: () => this.loginService.logout(),
    });
  }

  checkDarkMode(invert?: boolean): void {
    let darkMode = 'true' === localStorage.getItem(DARK_MODE);

    if (invert) {
      darkMode = !darkMode;
    }

    darkMode
      ? document.getElementsByTagName('html')[0].classList.add(DARK_MODE)
      : document.getElementsByTagName('html')[0].classList.remove(DARK_MODE);

    localStorage.setItem(DARK_MODE, String(darkMode));
    this.darkMode = darkMode;
  }

  private findUserData(): void {
    if (this.isVisible()) {
      this.userService.findLoggedIn().subscribe((r) => this.user.set(r));
    }
  }
}
