import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import WishlistTable from "../components/Wishlist/WishlistTable";
import {connect} from "react-redux";

class Wishlist extends Component {
    render() {
        return (
            <Wrapper>
                <Banner bannerData='Wishlist'/>
                <div className="wishlist-main-area  section-space--ptb_90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <WishlistTable/>
                                {/*<form action="#">*/}
                                {/*    <div className="table-content table-responsive cart-table-content">*/}
                                {/*        <table>*/}
                                {/*            <thead>*/}
                                {/*            <tr>*/}
                                {/*                <th className="product-name">Product</th>*/}
                                {/*                <th className="product-price"> Unit Price</th>*/}

                                {/*            </tr>*/}
                                {/*            </thead>*/}
                                {/*          */}
                                {/*            <tbody>*/}
                                {/*            <tr>*/}
                                {/*                <td className="product-remove">*/}
                                {/*                    <a href="#"><i className="icon-cross2"/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-img">*/}
                                {/*                    <a href="#"><img src="../assets/images/product/small/cart-01.webp"*/}
                                {/*                                     alt=""/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-name"><a href="#">Plant pots</a></td>*/}
                                {/*                <td className="product-price"><span className="amount">$17.00</span>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-stock-status">*/}
                                {/*                    <p>In Stock</p>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-wishlist-cart"><a href="#">add to cart</a></td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td className="product-remove">*/}
                                {/*                    <a href="#"><i className="icon-cross2"/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-img">*/}
                                {/*                    <a href="#"><img src="../assets/images/product/small/cart-02.webp"*/}
                                {/*                                     alt=""/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-name"><a href="#">Teapot with black tea</a></td>*/}
                                {/*                <td className="product-price"><span className="amount">$26.00</span>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-stock-status">*/}
                                {/*                    <p>In Stock</p>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-wishlist-cart"><a href="#">add to cart</a></td>*/}
                                {/*            </tr>*/}
                                {/*            <tr>*/}
                                {/*                <td className="product-remove">*/}
                                {/*                    <a href="#"><i className="icon-cross2"/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-img">*/}
                                {/*                    <a href="#"><img src="../assets/images/product/small/cart-03.webp"*/}
                                {/*                                     alt=""/></a>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-name"><a href="#">Wooden Flowerpot</a></td>*/}
                                {/*                <td className="product-price"><span className="amount">$22.00</span>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-stock-status">*/}
                                {/*                    <p>In Stock</p>*/}
                                {/*                </td>*/}
                                {/*                <td className="product-wishlist-cart"><a href="#">add to cart</a></td>*/}
                                {/*            </tr>*/}
                                {/*            </tbody>*/}
                                {/*        </table>*/}
                                {/*    </div>*/}
                                {/*</form>*/}
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
)(Wishlist)

export default Container;

