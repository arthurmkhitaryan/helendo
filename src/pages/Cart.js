import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import CartTable from "../components/Cart/CartTAble";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import CheckoutBtn from "../components/Cart/CheckoutBtn";

class Cart extends Component {
    render() {
        return (
            <Wrapper>
                <Banner bannerData='Cart'/>
                <div className="cart-main-area  section-space--ptb_90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <CartTable/>
                                <div className="cart-buttom-area">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="continue-shopping-butotn col-6 mt-30">
                                                <Link to='/shop_online' className="btn btn--lg btn--black"><i
                                                    className="icon-arrow-left"/> Continue Shopping </Link>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="cart_totals section-space--mt_60 ms-md-auto">
                                                <div className="grand-total-wrap">
                                                    <div className="grand-total-content">
                                                        <ul>
                                                            <li>Total <span>${this.props.data.subTotal}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <CheckoutBtn/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.cart.cartList,
    }
)

const mapDispatchToProps = {}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)

export default Container;
