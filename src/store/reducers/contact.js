import {
   CONTACT_FAIL,
   CONTACT_REQUEST,
   CONTACT_SUCCESS,
} from '../actions/contact';

const initialState = {
    data: {},
    dataStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CONTACT_REQUEST: {
            return {
                ...state,
                dataStatus: 'request',
            };
        }
        case CONTACT_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                dataStatus: 'success',
            };
        }
        case CONTACT_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                data: {},
                dataStatus: 'fail',
            };
        }

        default: {
            return state;
        }
    }
}
