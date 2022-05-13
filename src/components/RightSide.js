import React, {memo, useEffect, useState} from 'react';
import UserModal from "./User/UserModal";
import {getCartRequest} from "../store/actions/cart";
import {connect} from "react-redux";
import withRouter from "../helpers/withRouter";
import {getWishlistRequest} from "../store/actions/wishlist";

const RightSide = memo(props => {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(async () => {
        await props.getCartRequest()
        await props.getWishlistRequest()
    }, [])

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleNavigate = (path) => {
        props.navigate(path)
    }


    return (
        <div className="col-lg-3 col-lg-3 col-6">
            <div className="header-right-side text-end">
                <div className="header-right-items"
                     onClick={token ? () => handleNavigate('/my_account') : handleClick}>
                    <div className=" header-cart minicart-btn toolbar-btn header-icon">
                        <i className="icon-user"/>
                    </div>
                </div>
                <div className="header-right-items d-none d-md-block"
                     onClick={token ? () => handleNavigate('/wishlist') : handleClick}>
                    <div className="header-cart">
                        <i className="icon-heart"/>
                        {props.wishlist &&
                            <span className="item-counter">{props.wishlist.count ? props.wishlist.count : 0}</span>}
                    </div>
                </div>
                <div className="header-right-items"
                     onClick={token ? () => handleNavigate('/cart') : handleClick}>
                    <div className=" header-cart minicart-btn toolbar-btn header-icon">
                        <i className="icon-bag2"/>
                        <span className="item-counter">{props.cart.list?.length ? props.cart.list?.length : 0}</span>
                    </div>
                </div>
            </div>
            <UserModal open={open} handleClose={handleClose}/>
        </div>
    );
})

const mapStateToProps = (state) => ({
    cart: state.cart.cartList,
    wishlist: state.wishlist.wishlistList
})

const mapDispatchToProps = {
    getCartRequest,
    getWishlistRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(RightSide)

export default withRouter(Container);
