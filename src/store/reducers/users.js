import {
    LOGIN_SUCCESS,
    SENT_REGISTER_FAIL,
    SENT_REGISTER_REQUEST,
    SENT_REGISTER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from '../actions/users';

const initialState = {
    data: {},
    dataStatus: '',
    user: {},
    token: localStorage.getItem('token'),
    update: {}
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SENT_REGISTER_REQUEST: {
            return {
                ...state,
                dataStatus: 'request',
            };
        }
        case SENT_REGISTER_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                dataStatus: 'success',
            };
        }
        case SENT_REGISTER_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                data: {},
                dataStatus: 'fail',
            };
        }

        case LOGIN_SUCCESS: {
            const {token} = action.payload.data;
            localStorage.setItem('token', token);
            return {
                ...state,
                token,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload.data.user,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                update: action.payload.data
            };
        }


        default: {
            return state;
        }
    }
}
