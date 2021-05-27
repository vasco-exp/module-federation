import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
