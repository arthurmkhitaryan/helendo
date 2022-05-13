import {
    ADD_WISHLIST_FAIL,
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_SUCCESS,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_FAIL,
    DELETE_WISHLIST_SUCCESS,
    DELETE_WISHLIST_REQUEST,
    DELETE_WISHLIST_FAIL
} from '../actions/wishlist';


const initialState = {
    data: {},
    wishlistList: [],
    addWishlistStatus: '',
    getWishlistStatus: '',
    deleteWishlistStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_WISHLIST_REQUEST: {
            return {
                ...state,
                addWishlistStatus: 'request',
            };
        }
        case ADD_WISHLIST_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                addWishlistStatus: 'success',
            };
        }
        case ADD_WISHLIST_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                addWishlistStatus: 'fail',
            };
        }
        case GET_WISHLIST_REQUEST: {
            return {
                ...state,
                getWishlistStatus: 'request',
            };
        }
        case GET_WISHLIST_SUCCESS: {
            return {
                ...state,
                wishlistList: action.payload.data,
                getWishlistStatus: 'success',
            };
        }
        case GET_WISHLIST_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                getWishlistStatus: 'fail',
            };
        }
        case DELETE_WISHLIST_REQUEST: {
            return {
                ...state,
                deleteWishlistStatus: 'request',
            };
        }
        case DELETE_WISHLIST_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                deleteWishlistStatus: 'success',
            };
        }
        case DELETE_WISHLIST_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                deleteWishlistStatus: 'fail',
            };
        }

        default: {
            return state;
        }
    }
}
