import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Catalog } from './catalog/catalog';
import { DefaultGuard } from './auth/default.guard';
import { UserForm } from './user/user-form';
import { ProductDetail } from './catalog/product-detail/product-detail';
import { Cart } from './cart/cart';

export const routes: Routes = [
  {
    path: 'management',
    loadChildren: () =>
      import('./management/management.routes').then((m) => m.ManagementRoutingModule),
  },
  { path: 'login', component: Login },
  { path: 'catalog', component: Catalog, canActivate: [DefaultGuard] },
  { path: 'user', component: UserForm, canActivate: [DefaultGuard] },
  { path: 'product/:id', component: ProductDetail, canActivate: [DefaultGuard] },
  { path: 'cart', component: Cart, canActivate: [DefaultGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: '**', pathMatch: 'full', redirectTo: 'catalog' },
];
