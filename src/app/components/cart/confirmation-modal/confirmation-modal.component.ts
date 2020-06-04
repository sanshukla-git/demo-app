import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/classes/product';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import * as fromProductStore from '../../../../store/reducer/product.reducer';
import * as ProductActions from '../../../../store/actions/product.actions';

@Component({
  selector: 'cart-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  @Input() product: Product;

  constructor(
    private store:Store<fromProductStore.ProductState>,
    public activeModal: NgbActiveModal
  ) {
  }

  removeProduct (product: Product) {
    this.store.dispatch(new ProductActions.RemoveProductFromCart(product));
    this.activeModal.dismiss();
  }

  dissmissModal () {
    this.store.dispatch(new ProductActions.RemoveProductFromCartClear());
    this.activeModal.dismiss();
  }
}
