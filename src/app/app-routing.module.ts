import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
