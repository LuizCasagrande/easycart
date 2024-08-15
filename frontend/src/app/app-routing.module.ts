import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {DefaultGuard} from "./auth/default.guard";
import {ProductDetailComponent} from "./catalog/product/product-detail.component";
import {UserFormComponent} from "./user/user-form.component";

const routes: Routes = [
  {path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)},
  {path: 'user', component: UserFormComponent, canActivate: [DefaultGuard]},
  {path: 'product/:id', component: ProductDetailComponent, canActivate: [DefaultGuard]},
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
