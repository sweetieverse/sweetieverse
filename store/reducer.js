import { combineReducers } from 'redux';

import { reducer as nav } from '../modules/nav';
import { reducer as product } from '../modules/product';
import { reducer as storefront } from '../modules/storefront';

export default combineReducers({
  [nav.name]: nav.reducer,
  [product.name]: product.reducer,
  [storefront.name]: storefront.reducer,
});
