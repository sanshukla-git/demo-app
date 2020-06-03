import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromProductStore from '../../../store/reducer/product.reducer';
import { Observable, Subscription } from 'rxjs';
import { ProductStore } from 'src/models/product-store';
import { Product } from 'src/classes/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  product: Observable<ProductStore>;
  cartItemSubscription: Subscription;
  itemCount: number = 0;
  constructor(private store:Store<fromProductStore.ProductState>) { }

  ngOnInit(): void {
    this.product = this.store.select('productsStore');

    this.cartItemSubscription = this.product.subscribe((store: ProductStore) => {
      this.itemCount = store.shoppingList.reduce((count: number, product:Product) => {
        return count + product.itemsInCart
      }, 0);
    })
  }

}
