import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'user', loadChildren: '../components/user/user.module#UserModule' },
      { path: 'store', loadChildren: '../components/store/store.module#StoreModule' },
      { path: 'order', loadChildren: '../components/order/order.module#OrderModule' },
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
