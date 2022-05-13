import Api from '../../Api';
import {
    GET_PRODUCT_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_SINGLE_FAIL,
    GET_PRODUCT_SINGLE_REQUEST,
    GET_PRODUCT_SINGLE_SUCCESS,
} from "../actions/product";
import {call, put, takeLatest} from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(GET_PRODUCT_REQUEST, handleProduct);
    yield takeLatest(GET_PRODUCT_SINGLE_REQUEST, handleGetSingleProduct);
};

function* handleProduct(action) {
    try {
        const {filter, categoryId} = action.payload;
        const {data} = yield call(Api.getProductList, filter, categoryId);
        console.log(data)
        yield put({
            type: GET_PRODUCT_SUCCESS,
            payload: {
                data,
                categoryId
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_PRODUCT_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

function* handleGetSingleProduct(action) {
    try {
        const {params} = action.payload
        const {data} = yield call(Api.getProductSingle, params);
        console.log(data, 7)
        yield put({
            type: GET_PRODUCT_SINGLE_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_PRODUCT_SINGLE_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}
