import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [UsersComponent, ProductsComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
