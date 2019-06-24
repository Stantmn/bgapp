import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'user', loadChildren: () => import('../components/user/user.module').then(m => m.UserModule) },
      { path: 'store', loadChildren: () => import('../components/store/store.module').then(m => m.StoreModule) },
      { path: 'order', loadChildren: () => import('../components/order/order.module').then(m => m.OrderModule) },
      { path: 'product', loadChildren: () => import('../components/product/product.module').then(m => m.ProductModule) },
      { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
