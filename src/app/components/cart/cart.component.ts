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
  totalPrice: number = 0;
  totalDiscount: number = 0;
  constructor(private store:Store<fromProductStore.ProductState>) { }

  ngOnInit(): void {
    this.product = this.store.select('productsStore');

    this.cartItemSubscription = this.product.subscribe((store: ProductStore) => {
      this.itemCount = store.shoppingList.reduce((count: number, product:Product) => {
        return count + product.itemsInCart
      }, 0);
      this.totalPrice = store.shoppingList.reduce((price: number, product:Product) => {
        return price + (product.price.price * product.itemsInCart);
      }, 0);
      this.totalDiscount = store.shoppingList.reduce((price: number, product:Product) => {
        return price + (product.price.specialPrice > 0 ?  (product.price.price - product.price.specialPrice) * product.itemsInCart: 0);
      }, 0);
    })
  }

}
