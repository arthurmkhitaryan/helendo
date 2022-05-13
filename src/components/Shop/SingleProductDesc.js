import React, {Component} from 'react';
import {addCartRequest, getCartRequest} from "../../store/actions/cart";
import {connect} from "react-redux";
import {addWishlistRequest, getWishlistRequest} from "../../store/actions/wishlist";
import Rating from "./Rating";
import UserModal from "../User/UserModal";

class SingleProductDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            openModal: false
        }
    }

    handleIncrease = (qty) => {
        const {value} = this.state;
        if (value === qty) {
            return
        }
        this.setState({value: value + 1})
    }

    handleDecrease = () => {
        const {value} = this.state;
        if (value === 1) {
            return
        }
        this.setState({value: value - 1})
    }

    handleAddCart = async (count, productId) => {
        await this.props.addCartRequest({count, productId}, async () => {
            await this.props.getCartRequest()
        })
    }

    handleAddWishlist = async (productId) => {
        await this.props.addWishlistRequest({productId}, async () => {
            await this.props.getWishlistRequest()
        })
    }

    handleClickModal = () => {
        this.setState({openModal: true})
    }

    handleCloseModal = () => {
        this.setState({openModal: false})
    }


    render() {
        const {data} = this.props
        const {value, openModal} = this.state;
        const token = localStorage.getItem('token');
        return (
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
                <div className="product-details-content">
                    <h5 className="font-weight--reguler mb-10">{data.name}</h5>
                    <div className="quickview-ratting-review mb-10">
                        <div className="quickview-ratting-wrap">
                            <div className="quickview-ratting">
                                <Rating data={data}/>
                            </div>
                        </div>
                    </div>
                    <h3 className="price">${data.price}</h3>
                    <div className="quickview-peragraph mt-10">
                        <p>{data.shortDescription}</p>
                    </div>
                    <div className="quickview-action-wrap mt-30">
                        <div className="quickview-cart-box">
                            <div className="quickview-quality">
                                <div className="cart-plus-minus">
                                    <button
                                        className="reduced items-count" type="button"
                                        onClick={this.handleDecrease}>-
                                    </button>
                                    <input type="text" name="qty" id="sst" maxLength="5" value={value}
                                           title="Quantity:"
                                           className="input-text qty" readOnly/>
                                    <button
                                        className="increase items-count" type="button"
                                        onClick={() => this.handleIncrease(data.quantity)}>+
                                    </button>
                                </div>
                            </div>
                                <div className="quickview-button">
                                    <div className="quickview-cart button">
                                        <button
                                            className="btn--lg btn--black font-weight--reguler text-white"
                                            onClick={token ? () => {
                                                this.handleAddCart(value, data.id)
                                            }: this.handleClickModal}>
                                            Add to cart
                                    </button>
                                </div>
                                <div className="quickview-wishlist button">
                                    <button title="Add to wishlist"
                                            onClick={token ? () => this.handleAddWishlist(data.id) : this.handleClickModal}>
                                        <i className="icon-heart"/></button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="product_meta mt-30">
                        <div className="sku_wrapper item_meta">
                            <span className="label"> SKU:   </span>
                            <span className="sku"> {data.skuCode} </span>
                        </div>
                        <div className="posted_in item_meta">
                            <span className="label">Categories:   </span>
                            {data ? data.categories.map(c => (<span> {c.name} /  </span>)) : null}
                        </div>
                        <div className="sku_wrapper item_meta">
                            <span className="label">Detail: </span>
                            <span className='details-text'>{data.details}</span>
                        </div>
                    </div>
                </div>
                <UserModal open={openModal} handleClose={this.handleCloseModal}/>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addCartRequest,
    getCartRequest,
    addWishlistRequest,
    getWishlistRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleProductDesc)

export default Container;

