import Api from '../../Api';
import {
    GET_CAROUSEL_FAIL,
    GET_CAROUSEL_REQUEST,
    GET_CAROUSEL_SUCCESS,
    GET_BRAND_FAIL,
    GET_BRAND_REQUEST,
    GET_BRAND_SUCCESS,
    // LOGIN_FAIL,
    // LOGIN_REQUEST,
    // LOGIN_SUCCESS,
    // SENT_REGISTER_FAIL,
    // SENT_REGISTER_REQUEST,
    // SENT_REGISTER_SUCCESS
} from "../actions/slider";
import { call, put, takeLatest } from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(GET_CAROUSEL_REQUEST, handleCarousel);
    yield takeLatest(GET_BRAND_REQUEST, handleBrand);
    // yield takeLatest(LOGIN_REQUEST, handleLogin);
    // yield takeLatest(GET_USERS_REQUEST, handleGetUsersList);
};

function* handleCarousel(action) {
    try {
        const { params } = action.payload;
        const { data } = yield call(Api.getCarouselList, params);
        yield put({
            type: GET_CAROUSEL_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_CAROUSEL_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

function* handleBrand(action) {
    try {
        const { params } = action.payload;
        const { data } = yield call(Api.getCarouselList, params);
        yield put({
            type: GET_BRAND_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_BRAND_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

// function* handleLogin(action) {
//     try {
//         const { formData } = action.payload;
//
//         const { data } = yield call(Api.login, formData);
//         yield put({
//             type: LOGIN_SUCCESS,
//             payload: {
//                 data,
//             }
//         });
//         if (action.payload.cb) {
//             action.payload.cb(null, data);
//         }
//     } catch (e) {
//         console.warn(e)
//         yield put({
//             type: LOGIN_FAIL,
//             status: e.status,
//             message: e.message,
//         });
//         if (action.payload.cb) {
//             action.payload.cb(e, e.response?.data || {});
//         }
//     }
// }
// function* handleGetUsersList(action) {
//     try {
//         const { params } = action.payload;
//
//         const { data } = yield call(Api.getUsersList, params);
//         yield put({
//             type: GET_USERS_SUCCESS,
//             payload: {
//                 data,
//             }
//         });
//     } catch (e) {
//         console.warn(e)
//         yield put({
//             type: GET_USERS_FAIL,
//             status: e.status,
//             message: e.message,
//         });
//     }
// }
