import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTwoComponent } from './homeTwo/home-two.component';

const routes: Routes = [
  {
    path: 'dashboardTwo',
    loadChildren: () =>
      import('./dashboardTwo/dashboard-two.module').then(
        (m) => m.DashboardTwoModule
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  { path: '', component: HomeTwoComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
