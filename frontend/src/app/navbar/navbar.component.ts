import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {User, UserType} from "../user/user";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {SidebarService} from "../sidebar/sidebar.service";
import {catchError} from "rxjs";
import {Err} from "../shared/err";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  protected user!: User;
  protected readonly userType = UserType;
  protected items: MenuItem[] = [];

  constructor(private readonly loginService: LoginService,
              private readonly userService: UserService,
              private readonly sidebarService: SidebarService,
              private readonly confirmationService: ConfirmationService,
              private readonly messageService: MessageService,
              private readonly router: Router) {
    this.loginService.setTokenEvent
      .subscribe(() => this.findUser());
  }

  ngOnInit(): void {
    this.findUser();
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

  private findUser(): void {
    if (this.visible()) {
      this.userService.findLoggedIn()
        .pipe(catchError(Err.handle(this.messageService)))
        .subscribe(r => this.user = r);
    }
  }

  private createMenuItems(): void {
    this.items = [{
      label: 'Perfil',
    }, {
      label: 'Sair',
      command: () => this.logout(),
    }];
  }
}
