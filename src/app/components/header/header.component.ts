import { Component, OnInit, OnDestroy } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as fromProductStore from '../../../store/reducer/product.reducer';
import { Product } from 'src/classes/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'global-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCart = faShoppingCart;
  cartItemSubscription: Subscription;
  itemCount: number;

  constructor(private store: Store<fromProductStore.ProductState>) { }

  cartItems = this.store.select(state => state.productsStore.shoppingList);

  ngOnInit(): void {
    this.cartItemSubscription = this.cartItems.subscribe((cartItems: Product[]) => {
      this.itemCount = cartItems.reduce((count: number, product:Product) => {
        console.log('count: ' + count);
        console.log('product: ', product);
        return count + product.itemsInCart
      }, 0);
    })
  }

  ngOnDestroy() {
    this.cartItemSubscription.unsubscribe();
  }

}
