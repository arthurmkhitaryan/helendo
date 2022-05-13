import {
    GET_CATEGORY_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
} from '../actions/categories';

const initialState = {
    categoriesList: [],
    categoriesListStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_REQUEST: {
            return {
                ...state,
                categoriesListStatus: 'request',
            };
        }
        case GET_CATEGORY_SUCCESS: {
            return {
                ...state,
                categoriesList: action.payload.data.list,
                categoriesListStatus: 'success',
            };
        }
        case GET_CATEGORY_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                categoriesListStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
