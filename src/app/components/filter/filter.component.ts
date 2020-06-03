import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductStore } from 'src/models/product-store';

import * as ProductActions from '../../../store/actions/product.actions';
import * as fromProductStore from '../../../store/reducer/product.reducer';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  priceValues: Observable<ProductStore>;
  dataLoaded: Boolean = false;

  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1
  };

  constructor (
    private store: Store<fromProductStore.ProductState>
  ) {}

  ngOnInit(): void {
    this.priceValues = this.store.select('productsStore');

    this.priceValues.subscribe(changes => {
      const newOptions = Object.assign({}, this.options);
      newOptions.floor = changes.minPrice;
      newOptions.ceil = changes.maxPrice;
      this.options = newOptions;
      this.sliderForm.reset({sliderControl: [changes.filterMin, changes.filterMax]});
      this.dataLoaded = true;
    });
  }

  applyFilter(): void {
    this.store.dispatch(new ProductActions.UpdateFilterSelection({
      min: this.sliderForm.value.sliderControl[0],
      max: this.sliderForm.value.sliderControl[1]
    }));
    this.sliderForm.reset({
      sliderControl: [
        this.sliderForm.value.sliderControl[0],
        this.sliderForm.value.sliderControl[1]
      ]
    });
  }

}
