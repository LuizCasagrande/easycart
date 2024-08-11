import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {DefaultGuard} from "./auth/default.guard";
import {ManagerGuard} from "./auth/manager.guard";
import {ProductListComponent} from "./management/product/product-list.component";
import {ProductFormComponent} from "./management/product/product-form.component";

const routes: Routes = [
  {path: 'management/product', component: ProductListComponent, canActivate: [DefaultGuard, ManagerGuard]},
  {path: 'management/product/new', component: ProductFormComponent, canActivate: [DefaultGuard, ManagerGuard]},
  {path: 'management/product/:id', component: ProductFormComponent, canActivate: [DefaultGuard, ManagerGuard]},
  {path: 'catalog', component: CatalogComponent, canActivate: [DefaultGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'catalog'},
  {path: '**', pathMatch: 'full', redirectTo: 'catalog'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
