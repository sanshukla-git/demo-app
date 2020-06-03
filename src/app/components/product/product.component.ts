import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Product } from 'src/classes/product';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  productInCart: Boolean = false;
  subscription: Subscription;

  cartProducts = this.store.select(state => state.productsStore.itemsInCart);

  constructor (private store: Store<fromProductStore.ProductState>) {}

  ngOnInit() {
    this.subscription = this.cartProducts.subscribe((itemsInCart:number[]) => {
      this.productInCart = (itemsInCart.indexOf(this.product.id) !== -1);
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  get percentageDiscount (): number {
    const discount = Math.round(this.product.price.specialPrice > 0 ? ((this.product.price.price - this.product.price.specialPrice) / this.product.price.price * 100): 0);
    return discount;
  }

  addToCart(product: Product) {
    this.store.dispatch(new ProductActions.AddProductToCart(product));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(new ProductActions.RemoveProductFromCart(productId));
  }
}
