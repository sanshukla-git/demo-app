import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';


import { ProductService } from '../../service/product-service.service';
import { ProductStore } from 'src/models/product-store';
import { Product } from '../../../classes/product';
import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  iconFilter = faFilter;
  iconSort = faSort;
  product: Observable<ProductStore>;
  modalConfig: {title: string, type: string} = null;
  stateSubscription:Subscription;


  constructor (
    private productService: ProductService,
    private modalService: NgbModal,
    private store: Store<fromProductStore.ProductState>
  ) {}

  ngOnInit () {
    this.product = this.store.select('productsStore');

    this.stateSubscription = this.product.subscribe((state:ProductStore) => {
      if (state.products.length === 0) {
        this.productService.getProducts()
          .subscribe((data: Product[]) => {
            const minProductPrice = Math.min(...data.map(item => item.price.specialPrice > 0 ? item.price.specialPrice : item.price.price));
            const maxProductPrice = Math.max(...data.map(item => item.price.specialPrice > 0 ? item.price.specialPrice : item.price.price));
            this.store.dispatch(new ProductActions.UpdateMinimumProductPrice(minProductPrice));
            this.store.dispatch(new ProductActions.UpdateMaximumProductPrice(maxProductPrice));
            this.store.dispatch(new ProductActions.UpdateFetchedProducts(data));
          });
      }
    });
  }

  onResize(evt) {
    if (evt.target.innerWidth >= 768) {
      this.modalService.dismissAll();
    }
  }

  ngOnDestroy () {
    this.stateSubscription.unsubscribe();
  }

  openFilterModal (content) {
    this.modalConfig = {
      title: 'Filter by Price',
      type: 'FILTER'
    };
    this.modalService.open(content, { size: 'sm' });
  }

  openSortModal (content) {
    this.modalConfig = {
      title: 'Sort By',
      type: 'SORT'
    };
    this.modalService.open(content, { size: 'sm' });
  }

}
