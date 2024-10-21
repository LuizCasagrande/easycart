import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {User, UserType} from "../../user/user";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {SidebarService} from "../sidebar/sidebar.service";
import {catchError} from "rxjs";
import {Err} from "../../shared/err";
import {CartService} from "../../cart/cart.service";
import {ProductSearchService} from "../../catalog/product-search/product-search.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  cartSize = 0;
  enableDarkTheme = false;
  search = '';
  protected readonly USER_TYPE = UserType;
  protected user!: User;
  protected items: MenuItem[] = [];

  constructor(private readonly loginService: LoginService,
              private readonly userService: UserService,
              private readonly cartService: CartService,
              private readonly sidebarService: SidebarService,
              protected readonly productSearchService: ProductSearchService,
              private readonly confirmationService: ConfirmationService,
              private readonly messageService: MessageService,
              private readonly router: Router) {
    this.loginService.setTokenEvent
      .subscribe(() => this.findUserAndCart());
    this.cartService.cartSize$
      .subscribe(r => this.cartSize = r);
  }

  ngOnInit(): void {
    this.findUserAndCart();
    this.createMenuItems();
  }

  visible(): boolean {
    return this.loginService.hasToken();
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout(): void {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Tem certeza que deseja sair?',
      accept: () => {
        this.loginService.logout();
        this.router.navigateByUrl('login').catch();
      },
    });
  }

  private findUserAndCart(): void {
    if (this.visible()) {
      this.cartSize = this.cartService.getCartSize();
      this.userService.findLoggedIn()
        .pipe(catchError(Err.handle(this.messageService)))
        .subscribe(r => this.user = r);
    }
  }

  private createMenuItems(): void {
    this.items = [{
      label: 'Perfil',
      routerLink: '/user',
    }, {
      label: 'Sair',
      command: () => this.logout(),
    }];
  }
}
