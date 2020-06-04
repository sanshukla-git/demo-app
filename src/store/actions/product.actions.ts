import { Action } from '@ngrx/store';
import { Product } from '../../classes/product';

export const UPDATE_FETCHED_PRODUCTS = 'UPDATE_FETCHED_PRODUCTS';
export const UPDATE_MIN_PRICE = 'UPDATE_MIN_PRICE';
export const UPDATE_MAX_PRICE = 'UPDATE_MAX_PRICE';
export const UPDATE_FILTER_SELECTION = 'UPDATE_FILTER_SELECTION';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_PRODUCT_FROM_CART_TRIGGER = 'REMOVE_PRODUCT_FROM_CART_TRIGGER';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const SORT_PRICE_ASCENDING = 'SORT_PRICE_ASCENDING';
export const SORT_PRICE_DESCENDING = 'SORT_PRICE_DESCENDING';
export const SORT_BY_DISCOUNT = 'SORT_BY_DISCOUNT';
export const SEARCH_PRODUCTS_BY_NAME = 'SEARCH_PRODUCTS_BY_NAME';

export class UpdateFetchedProducts implements Action {
  readonly type = UPDATE_FETCHED_PRODUCTS;
  constructor (public payload: Product[]) {}
}

export class UpdateMinimumProductPrice implements Action {
  readonly type = UPDATE_MIN_PRICE;
  constructor (public payload: number) {}
}

export class UpdateMaximumProductPrice implements Action {
  readonly type = UPDATE_MAX_PRICE;
  constructor (public payload: number) {}
}

export class UpdateFilterSelection implements Action {
  readonly type = UPDATE_FILTER_SELECTION;
  constructor (public payload: {min: number, max: number}) {}
}

export class AddProductToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor (public payload: Product) {}
}

export class RemoveItemFromCart implements Action {
  readonly type = REMOVE_ITEM_FROM_CART;
  constructor (public payload: number) {}
}
export class RemoveProductFromCart implements Action {
  readonly type = REMOVE_PRODUCT_FROM_CART;
  constructor (public payload: Product) {}
}

export class RemoveProductFromCartTrigger implements Action {
  readonly type = REMOVE_PRODUCT_FROM_CART_TRIGGER;
  constructor (public payload: Product) {}
}

export class SortPriceAscending implements Action {
  readonly type = SORT_PRICE_ASCENDING;
}

export class SortPriceDescending implements Action {
  readonly type = SORT_PRICE_DESCENDING;
}

export class SortByDiscount implements Action {
  readonly type = SORT_BY_DISCOUNT;
}

export class SearchProductsByName implements Action {
  readonly type = SEARCH_PRODUCTS_BY_NAME;
  constructor (public payload: string) {}
}

export type ProductListActions =
  | UpdateFetchedProducts
  | UpdateMaximumProductPrice
  | UpdateMinimumProductPrice
  | UpdateFilterSelection
  | AddProductToCart
  | RemoveItemFromCart
  | RemoveProductFromCart
  | RemoveProductFromCartTrigger
  | SortPriceAscending
  | SortPriceDescending
  | SortByDiscount
  | SearchProductsByName;
