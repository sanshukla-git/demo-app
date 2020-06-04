import { Product } from 'src/classes/product';

export interface ProductStore {
  products: Product[];
  filteredProducts: Product[],
  minPrice: number;
  maxPrice: number;
  filterMin: number;
  filterMax: number;
  shoppingList: Product[];
  itemsInCart: number[],
  selectedFilterSort: string,
  // product which is to be removed from cart
  productToRemoveFromCart: Product
}
