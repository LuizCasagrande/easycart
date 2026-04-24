import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductList } from './product/product-list';
import { ManagerGuard } from '../auth/manager.guard';
import { DefaultGuard } from '../auth/default.guard';
import { ProductForm } from './product/product-form';

const routes = [
  { path: 'product', component: ProductList, canActivate: [DefaultGuard, ManagerGuard] },
  { path: 'product/new', component: ProductForm, canActivate: [DefaultGuard, ManagerGuard] },
  { path: 'product/:id', component: ProductForm, canActivate: [DefaultGuard, ManagerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
