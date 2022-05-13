import {all, fork} from 'redux-saga/effects';
import slider from './slider';
import product from './product';
import categories from './categories';
import users from './users';
import cart from './cart';
import wishlist from './wishlist';
import contact from './contact';
import order from './order';
import rating from './rating';

export default function* watchers() {
    yield all([
        slider,
        product,
        categories,
        users,
        cart,
        wishlist,
        contact,
        order,
        rating
    ].map(fork));
}
