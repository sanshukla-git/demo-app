import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/classes/product';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  storeSubscription: Subscription;
  filteredList: Observable<Product[]>;
  searchForm: FormGroup = new FormGroup({
    searchText: new FormControl()
  });

  constructor(private store:Store<fromProductStore.ProductState>) { }

  ngOnInit(): void {
    this.filteredList = this.store.select(state => state.productsStore.filteredProducts);

    this.storeSubscription = this.filteredList.subscribe(state => {
      this.searchForm.controls['searchText'].setValue('');
    })
  }

  searchProductsByName () {
    this.store.dispatch(new ProductActions.SearchProductsByName(this.searchForm.value.searchText));
  }

  onKeyDown(evt) {
    if (evt.keyCode === 13) {
      this.searchProductsByName();
    }
  }

}
