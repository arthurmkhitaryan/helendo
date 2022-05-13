import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ShopOnline from "./pages/ShopOnline";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";
import MyAccount from "./pages/MyAccount";
import ErrorPage from "./pages/ErrorPage";
import Wishlist from "./pages/Wishlist";
import TermsConditions from "./pages/TermsConditions";
import Policy from "./pages/Policy";
import FaqPage from "./pages/FaqPage";
import AboutUs from "./pages/AboutUs";
import Order from "./pages/Order";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/shop_online" element={<ShopOnline/>}/>
                    <Route path="/shop_online/single_product/:productId" element={<SingleProduct/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/check_out" element={<CheckOut/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/about_us" element={<AboutUs/>} />
                    <Route path="/my_account" element={<MyAccount/>}/>
                    <Route path="/404_page" element={<ErrorPage/>} />
                    <Route path="/wishlist" element={<Wishlist/>} />
                    <Route path="/terms_conditions" element={<TermsConditions/>} />
                    <Route path="/policy" element={<Policy/>} />
                    <Route path="/faq_page" element={<FaqPage/>} />
                    <Route path="/my_account/order/:id" element={<Order/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
