import { combineReducers } from 'redux';
import slider from './slider';
import product from './product';
import categories from './categories';
import users from './users';
import cart from './cart';
import wishlist from './wishlist';
import contact from './contact'
import order from './order';

export default combineReducers({
    slider, product, categories, users, cart, wishlist, contact, order
});
