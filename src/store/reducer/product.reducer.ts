import * as ProductActions from '../actions/product.actions';
import { ProductStore } from 'src/models/product-store';

export interface ProductState {
  productsStore: ProductStore
}

const initialState: ProductStore = {
  products: [],
  filteredProducts: [],
  minPrice: 0,
  maxPrice: 0,
  filterMin: 0,
  filterMax: 0,
  shoppingList: [],
  itemsInCart: [],
  selectedFilterSort: '',
  productToRemoveFromCart: null
};

export function productReducer(
  state: ProductStore = initialState,
  action: ProductActions.ProductListActions
): ProductStore {
  switch (action.type) {
    case ProductActions.UPDATE_FETCHED_PRODUCTS:
      return {
        ...state,
        ...{
          products: [...action.payload],
          filteredProducts: [...action.payload]
        }
      };
    case ProductActions.UPDATE_MIN_PRICE:
      return {
        ...state,
        ...{
          minPrice: action.payload,
          filterMin: action.payload,
        }
      };
    case ProductActions.UPDATE_MAX_PRICE:
      return {
        ...state,
        ...{
          maxPrice: action.payload,
          filterMax: action.payload
        }
      };
    case ProductActions.UPDATE_FILTER_SELECTION: {
      const newState = {...state};

      newState.filteredProducts = newState.products.filter(product => {
        if (product.price.specialPrice > 0) {
          return product.price.specialPrice >= action.payload.min && product.price.specialPrice <= action.payload.max;
        }
        return product.price.price >= action.payload.min && product.price.price <= action.payload.max;
      });
      return {
        ...newState,
        ...{
          filterMin: action.payload.min,
          filterMax: action.payload.max
        }
      };
    }
    case ProductActions.ADD_TO_CART: {
      const newState = {...state};

      const filteredProductsId = newState.filteredProducts.map(product => product.id);
      const masterProductsId = newState.products.map(product => product.id);
      const indexOfPayloadInCart = newState.itemsInCart.indexOf(action.payload.id);
      const productIndexInFiltered = filteredProductsId.indexOf(action.payload.id);
      const productIndexInMaster = masterProductsId.indexOf(action.payload.id);

      if (indexOfPayloadInCart !== -1) {
        // update product stock in list
        const productInList = newState.filteredProducts[productIndexInFiltered];
        const updatedProduct = {
          ...productInList,
          stock: productInList.stock - 1,
          itemsInCart: productInList.itemsInCart ? productInList.itemsInCart + 1: 1
        };

        const filteredProducts = [...newState.filteredProducts];
        filteredProducts[productIndexInFiltered] = {...updatedProduct};

        // updated product object in master array
        const products = [...newState.products];
        products[productIndexInMaster] = {...updatedProduct};

        // update product cart list
        const cartProducts = [...newState.shoppingList];
        cartProducts[indexOfPayloadInCart] = {...updatedProduct};

        return {
          ...newState,
          filteredProducts,
          shoppingList: cartProducts,
          products
        };
      } else {

        //update stock remaining
        const product = newState.filteredProducts[productIndexInFiltered];
        const updatedProduct = {
          ...product,
          stock: product.stock - 1,
          itemsInCart: product.itemsInCart ? product.itemsInCart + 1: 1
        };

        const filteredProducts = [...newState.filteredProducts];
        filteredProducts[productIndexInFiltered] = updatedProduct;

        // updated product object in master array
        const products = [...newState.products];
        products[productIndexInMaster] = updatedProduct;

        //update shopping list
        newState.shoppingList = [...newState.shoppingList, ...[updatedProduct]];

        // add id in itemsInCart array
        newState.itemsInCart = [...newState.itemsInCart, action.payload.id];

        return {
          ...newState,
          filteredProducts,
          products
        }
      }
    }
    case ProductActions.REMOVE_ITEM_FROM_CART: {
      const newState = {...state};

      const filteredProductsId = newState.filteredProducts.map(product => product.id);
      const masterProductsId = newState.products.map(product => product.id);
      const indexOfPayloadInCart = newState.itemsInCart.indexOf(action.payload);
      const productIndexInFiltered = filteredProductsId.indexOf(action.payload);
      const productIndexInMaster = masterProductsId.indexOf(action.payload);

      if (indexOfPayloadInCart !== -1) {
        // update product stock in list
        const productInList = newState.filteredProducts[productIndexInFiltered];
        const updatedProduct = {
          ...productInList,
          stock: productInList.stock + 1,
          itemsInCart: productInList.itemsInCart > 0 ? productInList.itemsInCart - 1: 0
        };
        const filteredProducts = [...newState.filteredProducts];
        filteredProducts[productIndexInFiltered] = updatedProduct;

        // updated product object in master array
        const products = [...newState.products];
        products[productIndexInMaster] = updatedProduct;

        // update product cart list
        const cartProducts = [...newState.shoppingList];
        const itemsInCart = [...newState.itemsInCart];

        if (updatedProduct.itemsInCart > 0) {
          cartProducts[indexOfPayloadInCart] = updatedProduct;
        } else {
          cartProducts.splice(indexOfPayloadInCart, 1);
          // remove id from itemsInCart array
          itemsInCart.splice(indexOfPayloadInCart, 1);
        }

        return {
          ...newState,
          filteredProducts,
          shoppingList: cartProducts,
          itemsInCart
        };
      }
      break;
    }
    // reducer case to trigger modal to remove product
    case ProductActions.REMOVE_PRODUCT_FROM_CART_TRIGGER: {
      return {
        ...state,
        productToRemoveFromCart: action.payload
      }
      break;
    }
    // remove selected product on confirmation
    case ProductActions.REMOVE_PRODUCT_FROM_CART: {
      const newState = {...state};

      const filteredProductsId = newState.filteredProducts.map(product => product.id);
      const masterProductsId = newState.products.map(product => product.id);
      const indexOfPayloadInCart = newState.itemsInCart.indexOf(action.payload.id);
      const productIndexInFiltered = filteredProductsId.indexOf(action.payload.id);
      const productIndexInMaster = masterProductsId.indexOf(action.payload.id);

      if (indexOfPayloadInCart !== -1) {
        // update product stock in list
        const productInList = newState.filteredProducts[productIndexInFiltered];
        const updatedProduct = {
          ...productInList,
          stock: productInList.stock + (productInList.itemsInCart > 0 ? productInList.itemsInCart: 0),
          itemsInCart: 0
        };
        const filteredProducts = [...newState.filteredProducts];
        filteredProducts[productIndexInFiltered] = updatedProduct;

        // updated product object in master array
        const products = [...newState.products];
        products[productIndexInMaster] = updatedProduct;

        // update product cart list
        const cartProducts = [...newState.shoppingList];
        const itemsInCart = [...newState.itemsInCart];

        cartProducts.splice(indexOfPayloadInCart, 1);
        // remove id from itemsInCart array
        itemsInCart.splice(indexOfPayloadInCart, 1);

        return {
          ...newState,
          filteredProducts,
          shoppingList: cartProducts,
          itemsInCart,
          productToRemoveFromCart: null
        };
      }
      break;
    }
    case ProductActions.SORT_PRICE_ASCENDING: {
      const filteredProducts = [...state.filteredProducts];
      filteredProducts.sort((a, b) => {
        if (a.price.specialPrice > 0) {
          if (b.price.specialPrice > 0) {
            return a.price.specialPrice > b.price.specialPrice ? 1: -1;
          } else {
            return a.price.specialPrice > b.price.price ? 1: -1;
          }
        } else {
          if (b.price.specialPrice > 0) {
            return a.price.price > b.price.specialPrice ? 1: -1;
          } else {
            return a.price.price > b.price.price ? 1: -1;
          }
        }
      });
      return {
        ...state,
        filteredProducts,
        selectedFilterSort: 'ASC'
      };
    }
    case ProductActions.SORT_PRICE_DESCENDING: {
      const filteredProducts = [...state.filteredProducts];
      filteredProducts.sort((a, b) => {
        if (a.price.specialPrice > 0) {
          if (b.price.specialPrice > 0) {
            return a.price.specialPrice < b.price.specialPrice ? 1: -1;
          } else {
            return a.price.specialPrice < b.price.price ? 1: -1;
          }
        } else {
          if (b.price.specialPrice > 0) {
            return a.price.price < b.price.specialPrice ? 1: -1;
          } else {
            return a.price.price < b.price.price ? 1: -1;
          }
        }
      });
      return {
        ...state,
        filteredProducts,
        selectedFilterSort: 'DESC'
      };
    }
    case ProductActions.SORT_BY_DISCOUNT: {
      const filteredProducts = [...state.filteredProducts];
      filteredProducts.sort((a, b) => {
        const discProdA = Math.round(a.price.specialPrice > 0 ? ((a.price.price - a.price.specialPrice) / a.price.price * 100): 0);
        const discProdB = Math.round(b.price.specialPrice > 0 ? ((b.price.price - b.price.specialPrice) / b.price.price * 100): 0);

        return discProdA < discProdB ? 1: -1;
      });
      return {
        ...state,
        filteredProducts,
        selectedFilterSort: 'DISC'
      };
    }
    case ProductActions.SEARCH_PRODUCTS_BY_NAME: {
      const allProducts = [...state.products];

      const filteredProducts = allProducts.filter(product => {
        if (product.price.specialPrice > 0) {
          return (
            (product.price.specialPrice >= state.filterMin && product.price.specialPrice <= state.filterMax) &&
            product.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
          );
        }
        return (
          (product.price.price >= state.filterMin && product.price.price <= state.filterMax) &&
          product.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
        );
      });
      return {
        ...state,
        filteredProducts
      };
    }
    default:
      return state;
  }
}
