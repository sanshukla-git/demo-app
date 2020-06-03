import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { ProductService } from '../../service/product-service.service';
import { Product } from '../../../classes/product';
import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';
import { ProductStore } from 'src/models/product-store';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingListComponent implements OnInit {

  product: Observable<ProductStore>;


  constructor (
    private productService: ProductService,
    private store: Store<fromProductStore.ProductState>
  ) {}

  ngOnInit () {
    this.product = this.store.select('productsStore');

    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        const minProductPrice = Math.min(...data.map(item => item.price.specialPrice > 0 ? item.price.specialPrice : item.price.price));
        const maxProductPrice = Math.max(...data.map(item => item.price.specialPrice > 0 ? item.price.specialPrice : item.price.price));
        this.store.dispatch(new ProductActions.UpdateMinimumProductPrice(minProductPrice));
        this.store.dispatch(new ProductActions.UpdateMaximumProductPrice(maxProductPrice));
        this.store.dispatch(new ProductActions.UpdateFetchedProducts(data));
      });
  }

}
