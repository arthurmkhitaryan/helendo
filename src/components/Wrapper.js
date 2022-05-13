import React, {Component, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {getCartRequest} from "../store/actions/cart";
import {getWishlistRequest} from "../store/actions/wishlist";
import {connect} from "react-redux";

const Wrapper = (props) =>  {

    const [cartCount, setCartCount] = useState(0);

    return (
        <div className="box-home">
            <div className="page-box">
                <div>
                    <Header cartCount={cartCount} setCartCount={setCartCount}/>
                    {props.children}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//         cart: state.cart.cartList,
//         wishlist: state.wishlist.wishlistList,
//     }
// )
//
// const mapDispatchToProps = {
//     getCartRequest,
//     getWishlistRequest
// }
//
// const Container = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Wrapper)

export default Wrapper;
