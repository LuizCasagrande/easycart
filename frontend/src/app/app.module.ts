import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarModule} from "./navbar/navbar.module";
import {EcSidebarModule} from "./sidebar/sidebar.module";
import {HttpRequestInterceptor} from "./http-request.interceptor";
import {UserService} from "./user/user.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {LoaderService} from "./shared/loader/loader.service";
import {LoaderModule} from "./shared/loader/loader.module";
import {EcBreadcrumbModule} from "./breadcrumb/breadcrumb.module";
import {ManagementModule} from "./management/management.module";
import {CatalogModule} from "./catalog/catalog.module";
import {UserModule} from "./user/user.module";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoaderModule,
    NavbarModule,
    EcSidebarModule,
    EcBreadcrumbModule,
    ToastModule,
    ConfirmDialogModule,
    LoginModule,
    ManagementModule,
    CatalogModule,
    UserModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    provideHttpClient(withInterceptorsFromDi()),
    LoaderService,
    MessageService,
    ConfirmationService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
