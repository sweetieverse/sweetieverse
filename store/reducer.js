import { combineReducers } from 'redux';

import { reducer as game } from '../modules/game';
import { reducer as nav } from '../modules/nav';
import { reducer as product } from '../modules/product';
import { reducer as storefront } from '../modules/storefront';
import { reducer as user } from '../modules/user';

export default combineReducers({
  [game.name]: game.reducer,
  [nav.name]: nav.reducer,
  [product.name]: product.reducer,
  [storefront.name]: storefront.reducer,
  [user.name]: user.reducer,
});
