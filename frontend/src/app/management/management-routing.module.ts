import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductListComponent} from "./product/product-list.component";
import {DefaultGuard} from "../auth/default.guard";
import {ManagerGuard} from "../auth/manager.guard";
import {ProductFormComponent} from "./product/product-form.component";

const routes = [
  {path: 'product', component: ProductListComponent, canActivate: [DefaultGuard, ManagerGuard]},
  {path: 'product/new', component: ProductFormComponent, canActivate: [DefaultGuard, ManagerGuard]},
  {path: 'product/:id', component: ProductFormComponent, canActivate: [DefaultGuard, ManagerGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
