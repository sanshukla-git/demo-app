import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';
import { Observable } from 'rxjs';

const FILTER_STATES = {
  ASCENDING: 'ASC',
  DESCENDING: 'DESC',
  DISCOUNT: 'DISC'
};

@Component({
  selector: 'filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})
export class FilterSortComponent implements OnInit {

  sortType: Observable<string>;
  constructor(private store: Store<fromProductStore.ProductState>) { }

  ngOnInit(): void {
    this.sortType = this.store.select(state => state.productsStore.selectedFilterSort);
  }

  sortProducts (sortType: string) {
    switch (sortType) {
      case (FILTER_STATES.ASCENDING): {
        this.store.dispatch(new ProductActions.SortPriceAscending);
        break;
      }
      case (FILTER_STATES.DESCENDING): {
        this.store.dispatch(new ProductActions.SortPriceDescending);
        break;
      }
      case (FILTER_STATES.DISCOUNT): {
        this.store.dispatch(new ProductActions.SortByDiscount);
        break;
      }
    }
  }

}
