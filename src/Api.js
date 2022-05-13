import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

class Api {
    static register(formData = {}) {
        return api.post('/user/registration', formData);
    }

    static login(formData) {
        return api.post('/user/login', formData);
    }

    static getUser() {
        return api.get('/user/get');
    }

    static updateUser(formData={}) {
        return api.put('/user/update', formData);
    }

    static getCarouselList(params) {
        return api.get(`/slider/get?type=${params}`);
    }

    static getProductList(filter, categoryId) {
            return api.post(`/products/get?${categoryId}`, {filter});
    }

    static getProductSingle(params) {
        return api.get(`/products/get/${params}`);
    }

    static getCategoryList() {
        return api.get(`/categories/get`);
    }

    static addCart(formData = {}) {
        return api.post(`/cart/add`, formData);
    }

    static getCart() {
        return api.get(`/cart/get`);
    }

    static updateCart(formData = {}) {
        return api.put(`/cart/update`, formData);
    }

    static deleteCart(id) {
        return api.delete(`/cart/delete/${id}`);
    }

    static addWishlist(formData = {}) {
        return api.post(`/wishlist/add`, formData);
    }

    static getWishlist(){
        return api.get(`/wishlist/get`);
    }

    static deleteWishlist(id) {
        return api.delete(`/wishlist/delete/${id}`);
    }

    static sendMessage(formData = {}) {
        return api.post(`/contact/send`, formData);
    }

    static addOrder() {
        return api.post(`/order/add`);
    }

    static getOrder() {
        return api.get(`/order/get`);
    }

    static getOrderSingle(params) {
        return api.get(`/order/get/${params}`);
    }

    static setRating(formData = {}) {
        return api.post(`/rating/set`, formData);
    }
}

export default Api;
