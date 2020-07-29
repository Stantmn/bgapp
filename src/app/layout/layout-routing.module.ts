import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'settings', loadChildren: '../components/settings/settings.module#SettingsModule' },
      { path: 'user', loadChildren: '../components/user/user.module#UserModule' },
      { path: 'store', loadChildren: '../components/store/store.module#StoreModule' },
      { path: 'billing', loadChildren: '../components/billing/billing.module#BillingModule' },
      { path: 'order', loadChildren: '../components/order/order.module#OrderModule' },
      { path: 'product', loadChildren: '../components/product/product.module#ProductModule' },
      { path: 'logs', loadChildren: '../components/log/log.module#LogModule' },
      { path: 'form', loadChildren: './form/form.module#FormModule' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
