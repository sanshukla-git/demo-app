import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchForm: FormGroup = new FormGroup({
    searchText: new FormControl()
  });

  constructor(private store:Store<fromProductStore.ProductState>) { }

  ngOnInit(): void {
  }

  searchProductsByName () {
    this.store.dispatch(new ProductActions.SearchProductsByName(this.searchForm.value.searchText));
  }

}
